import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public firebaseAuth: AngularFireAuth) {}

  ngOnInit(): void {}

  handleLogout() {
    this.firebaseAuth.signOut();
  }
}
