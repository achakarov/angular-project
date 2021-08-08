import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserService // private router: Router
  ) {}
  ngOnInit(): void {}

  register(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value;
    this.userService.register({ email, password });
  }

  // ngOnDestroy(): void {
  //   this.killSubscription.next();
  //   this.killSubscription.complete();
  // }
}
