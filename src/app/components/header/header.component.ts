import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  get isLogged(): string | null {
    return this.userService.isLogged;
  }

  constructor(
    public firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleLogout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    console.log('Logged out!');
    this.router.navigate(['/']);
  }

  getEmail(): string {
    if (localStorage.getItem('user')) {
      const { email } = JSON.parse(localStorage.getItem('user')!);
      return email;
    } else {
      return '';
    }
  }
}
