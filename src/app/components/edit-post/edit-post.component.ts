import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  currentPost: any;
  private notifier: NotifierService;
  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    notifierService: NotifierService
  ) {
    this.getPost();
    this.notifier = notifierService;
  }

  ngOnInit(): void {}

  getPost(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.postService.getPost(id).subscribe((val) => (this.currentPost = val));
  }

  updatePost(data: any): void {
    const id = this.activatedRoute.snapshot.params.id;

    const { title, category, content } = data;
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

    this.postService
      .updatePost(data, id)
      .then(() => {
        this.notifier.notify('success', 'The post was updated successfully!');
        this.router.navigate(['/']);
      })
      .catch((err: any) => this.notifier.notify('error', err));
  }
}
