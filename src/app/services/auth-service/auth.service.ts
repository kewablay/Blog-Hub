import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  user,
  UserCredential,
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
    const avatarUrl = `https://api.dicebear.com/9.x/thumbs/svg?seed=${username}&mouth=variant1,variant3,variant4,variant5,variant2`;

    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredentials) => {
        const userId = userCredentials.user.uid;
        return addDoc(usersCollection, {
          uid: userId,
          username: username,
          email: email,
          avatarUrl: avatarUrl,
        }).then();
      }
    );
  }

  googleSignIn(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then((result) => {
      const user = result.user;
      const usersCollection = collection(this.firestore, 'users');
      
      // Check if user already exists, if not add to Firestore
      return addDoc(usersCollection, {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        avatarUrl: user.photoURL,
      }).then(() => result);
    });
  }


  

  logout() {
    // this.router.navigate(['/login']);
    return this.auth
      .signOut()
      .then(() => {
        this.router.navigate(['auth/login']);
      })
      .catch((err) => console.log('error occured while logging out', err));
  }
}
