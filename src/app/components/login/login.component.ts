import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private notifier: NotifierService;

  constructor(
    private userService: UserService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {}

  login(form: NgForm): void {
    const { email, password } = form.value;
    if (form.invalid) {
      form.reset();
      this.notifier.notify(
        'error',
        'Please provide a valid email and password at least 6 characters long'
      );
      return;
    }
    this.userService
      .login({ email, password })
      .then(() => {
        this.notifier.notify('success', 'Successful login');
      })
      .catch(() =>
        this.notifier.notify('error', 'Incorrect username or password')
      );
  }
}
