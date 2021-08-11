import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  currentPost: any;
  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.getPost();
  }

  ngOnInit(): void {}

  getPost(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.postService.getPost(id).subscribe((val) => (this.currentPost = val));
  }

  updatePost(data: any): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.postService
      .updatePost(data, id)
      .then(() => {
        console.log('The post was updated successfully!');
        this.router.navigate(['/']);
      })
      .catch((err: any) => console.log(err));
  }
}
