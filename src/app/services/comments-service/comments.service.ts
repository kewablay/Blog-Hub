import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  DocumentData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private firestore: Firestore) {}

  getCommentsByPostId(postId: string | null): Observable<DocumentData[]> {
    const commentsCollection = collection(this.firestore, 'comments');
    return from(
      collectionData(query(commentsCollection, where('postId', '==', postId)), {
        idField: 'id',
      })
    );
  }

  createComment(
    content: string | null,
    postId: string | null,
    authorId: string | undefined
  ) {
    const commentsCollection = collection(this.firestore, 'comments');
    return addDoc(commentsCollection, {
      content: content,
      postId: postId,
      authorId: authorId,
      createdAt: new Date(),
      likes: 0,
      dislikes: 0,
    });
  }
}
