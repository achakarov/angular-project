import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/interfaces/post';
import { map } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.css'],
})
export class DetailsPostComponent implements OnInit {
  post: any;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {
    this.getPost();
  }

  ngOnInit(): void {}

  getPost(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.postService.getPost(id).subscribe((val) => (this.post = val));
  }
}
