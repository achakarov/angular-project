import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: IUser | null | undefined = undefined;

  get isLogged(): string | null {
    return localStorage.getItem('user');
  }
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {}

  login(data: { email: string; password: string }) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        localStorage.setItem(
          'user',
          JSON.stringify({
            uid: result.user?.uid,
            email: result.user?.email,
          })
        );
        this.router.navigate(['/']);
      });
  }

  register(data: { email: string; password: string }) {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('Auth Service: signup error', error);
      });
  }
}
