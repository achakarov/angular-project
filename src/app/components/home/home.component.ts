import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPost, IPostId } from 'src/app/interfaces/post';
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

  // private postCollection: AngularFirestoreCollection<IPost>;
  posts!: Observable<IPostId[]>;

  // public posts: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private postService: PostService
  ) {
    this.getMyPosts();
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
    if (form.invalid) {
      return;
    }
    this.postService.createPost(form.value, author);
    this.router.navigate(['/']);
    form.reset();
  }

  getMyPosts(): any {
    this.posts = this.postService.getAllPosts().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as IPost;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    console.log(this.posts);
  }
}
