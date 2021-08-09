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
  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get email(): string {
    return this.userService.user?.email || '';
  }
  constructor(
    public firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleLogout() {
    this.firebaseAuth.signOut();
    console.log('Logged out!');
    this.router.navigate(['/']);
  }
}
