import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { collection, doc, Firestore, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  // getUserById(userId: string): Observable<User | undefined> {
  //   const userDocRef = doc(this.firestore, `users/${userId}`);
  //   return from(getDoc(userDocRef)).pipe(
  //     map(docSnap => docSnap.exists() ? docSnap.data() as User : undefined)
  //   );
  // }

  getUserById(uid: string | undefined) {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('uid', '==', uid));

    return getDocs(q)
      .then((snapshot) => {
        if (!snapshot.empty) {
          return snapshot.docs[0].data(); // return the first matching user's data
        } else {
          throw new Error('User not found');
        }
      })
      .catch((error) => {
        console.error('Error getting user: ', error);
        throw error;
      });
  }
}
