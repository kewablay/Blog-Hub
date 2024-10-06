import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { catchError, from, map, Observable, of, tap } from 'rxjs';
import { LocalStorageService } from '../localStorageService/local-storage.service';
import { OnlineStatusService } from '../online-status/online-status.service';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(
    private firestore: Firestore,
    private localStorageService: LocalStorageService,
    private onlineStatusService: OnlineStatusService
  ) {}

  getBlogPosts(): Observable<DocumentData[]> {
    if (this.onlineStatusService.isOnline()) {
      const postCollection = collection(this.firestore, 'posts');
      return collectionData(postCollection, { idField: 'id' }).pipe(
        // here we cache blog posts to handle offline viewing
        tap((posts) => {
          this.localStorageService.setItem('cachedBlogPosts', posts);
        }),
        catchError(() => {
          const cachedPosts =
            this.localStorageService.getItem('cachedBlogPosts');
          return cachedPosts ? of(cachedPosts) : of([]);
        })
      );
    } else {
      const cachedPosts = this.localStorageService.getItem('cachedBlogPosts');
      return cachedPosts ? of(cachedPosts) : of([]);
    }
  }

  getBlogById(id: string): Observable<DocumentData | undefined> {
    // IF USER IS ONLINE GET BLOG POST FROM FIRESTORE
    if (this.onlineStatusService.isOnline()) {
      const postDoc = doc(this.firestore, 'posts', id);
      return from(getDoc(postDoc)).pipe(
        map((docSnap) => (docSnap.exists() ? docSnap.data() : undefined)),
        // after getting the blog post we cache it for offline viewing
        tap((post) => {
          if (post) {
            this.localStorageService.setItem(`blog-post-${id}`, post);
          }
        }),
        catchError(() => {
          const cachedPost = this.localStorageService.getItem(
            `blog-post-${id}`
          );
          return cachedPost ? of(cachedPost) : of(undefined);
        })
      );
    }
    // IF USER IS OFFLINE GET BLOG POST FROM LOCAL STORAGE
    else {
      const cachedPost = this.localStorageService.getItem(`blog-post-${id}`);
      return cachedPost ? of(cachedPost) : of(undefined);
    }
  }

  createBlogPost(post: DocumentData) {
    const postsCollection = collection(this.firestore, 'posts');
    return addDoc(postsCollection, post);
  }

  // Delete a blog post by ID
  deleteBlogPost(id: string) {
    const postDoc = doc(this.firestore, 'posts', id);
    return from(deleteDoc(postDoc));
  }

  // Update a blog post by ID
  updateBlogPost(id: string, post: Partial<DocumentData>) {
    const postDoc = doc(this.firestore, 'posts', id);
    return from(updateDoc(postDoc, post)).pipe(
      tap(() => {
        // after updating the blog post update the cache to keep things in sync
        const cachedPost = this.localStorageService.getItem(`blog-post-${id}`);
        if (cachedPost) {
          this.localStorageService.setItem(`blog-post-${id}`, {
            ...cachedPost,
            ...post,
          });
        }
      })
    );
  }
}
