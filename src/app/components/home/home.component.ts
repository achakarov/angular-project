import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  get isLogged(): string | null {
    return this.userService.isLogged;
  }
  constructor(
    private userService: UserService,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {}

  createPost(form: NgForm): void {
    const author = 'asd';
    if (form.invalid) {
      return;
    }
    this.postService.createPost(form.value, author);
    this.router.navigate(['/']);
    form.reset();
  }
}
