import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPost, IPostId } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private notifier: NotifierService;
  get isLogged(): string | null {
    return this.userService.isLogged;
  }

  posts!: Observable<IPostId[]>;

  constructor(
    private userService: UserService,
    private router: Router,
    private postService: PostService,
    notifierService: NotifierService
  ) {
    this.getMyPosts();
    this.notifier = notifierService;
  }

  ngOnInit(): void {}

  getUserId(): string {
    if (localStorage.getItem('user')) {
      const { uid } = JSON.parse(localStorage.getItem('user')!);
      return uid;
    } else {
      return '';
    }
  }

  createPost(form: NgForm): void {
    const author = this.getUserId();
    const { title, category, content } = form.value;
    if (title === '' || category === '' || content === '') {
      this.notifier.notify('error', 'Please fill in all fields');
      return;
    }

    if (title.length < 4 || category.length < 4) {
      this.notifier.notify(
        'error',
        'Title and Category must be at least 4 characters.'
      );
      return;
    }

    if (content.length < 10) {
      this.notifier.notify('error', 'Content must be at least 10 characters.');
      return;
    }

    if (form.invalid) {
      return;
    }
    this.postService.createPost(form.value, author);
    this.router.navigate(['/']);
    form.reset();
  }

  getMyPosts(): any {
    this.posts = this.postService.getMyPosts().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as IPost;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  deletePost(post: any) {
    this.postService.deletePost(post.id);
  }
}
