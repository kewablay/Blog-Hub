import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private firestore: Firestore) {}

  getBlogPosts(): Observable<unknown[]> {
    const postCollection = collection(this.firestore, 'posts');
    return collectionData(postCollection, { idField: 'id' });
  }
}
