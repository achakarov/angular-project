import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IPost } from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private angularFirestore: AngularFirestore) {}

  createPost(post: IPost, author: string) {
    const newPost = { ...post, author };
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('posts')
        .add(newPost)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }
}
