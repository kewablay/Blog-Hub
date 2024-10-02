import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  user,
} from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private router: Router
  ) {}

  authState(): Observable<any> {
    return user(this.auth); 
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signUp(email: string, username: string, password: string) {
    const usersCollection = collection(this.firestore, 'users');

    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredentials) => {
        const userId = userCredentials.user.uid;
        return addDoc(usersCollection, { id: userId, username: username });
      }
    );
  }

  logout() {
    // this.router.navigate(['/login']);
    return this.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((err) => console.log('error occured while logging out', err));
  }
}
