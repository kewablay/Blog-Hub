import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  DocumentData,
  Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private firestore: Firestore) {}

  getBlogPosts(): Observable<DocumentData[]> {
    const postCollection = collection(this.firestore, 'posts');
    return collectionData(postCollection, { idField: 'id' });
  }
}
