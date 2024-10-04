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
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private firestore: Firestore) {}

  getBlogPosts(): Observable<DocumentData[]> {
    const postCollection = collection(this.firestore, 'posts');
    return collectionData(postCollection, { idField: 'id' });
  }

  getBlogById(id: string): Observable<DocumentData | undefined> {
    const postDoc = doc(this.firestore, 'posts', id);
    return from(getDoc(postDoc)).pipe(
      map((docSnap) => (docSnap.exists() ? docSnap.data() : undefined))
    );
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
  // updateBlogPost(id: string, post: DocumentData) {
  //   const postDoc = doc(this.firestore, 'posts', id);
  //   return from(getDoc(postDoc)).pipe(
  //     map((docSnap) => (docSnap.exists() ? docSnap.data() : undefined))
  //   );
  // }

  updateBlogPost(id: string, post: Partial<DocumentData>) {
    const postDoc = doc(this.firestore, 'posts', id);
    return from(updateDoc(postDoc, post));
  }
}
