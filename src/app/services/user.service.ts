import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: IUser | null | undefined = undefined;

  get isLogged(): boolean {
    return !!this.user;
  }
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {}

  login(data: { email: string; password: string }) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        console.log(result);
        this.user!.email != result.user?.email;
        this.user!.uid != result.user?.uid;

        console.log('Auth Service: login: success');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return { isValid: false, message: error.message };
        else return;
      });
  }

  register(data: { email: string; password: string }) {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        console.log(result);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('Auth Service: signup error', error);
        if (error.code) return { isValid: false, message: error.message };
        else return;
      });
  }
}
