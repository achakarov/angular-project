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
    if (form.invalid) {
      this.notifier.notify('error', 'Incorrect email or password!');
      form.reset();
      return;
    }
    const { email, password } = form.value;
    this.userService.login({ email, password });
    this.notifier.notify('success', 'Successful login');
  }
}
