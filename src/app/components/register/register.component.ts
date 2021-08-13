import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private notifier: NotifierService;
  constructor(
    private userService: UserService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }
  ngOnInit(): void {}

  register(form: NgForm): void {
    if (form.invalid) {
      this.notifier.notify(
        'error',
        'Please provide a valid email and password at least 6 characters long'
      );
      return;
    }
    const { email, password, repeatPassword } = form.value;
    if (password !== repeatPassword) {
      this.notifier.notify('error', 'Passwords must match!');
      return;
    }
    this.userService.register({ email, password });
    this.notifier.notify('success', 'Successful registration');
  }
}
