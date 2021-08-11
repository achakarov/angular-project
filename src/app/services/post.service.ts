import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { IPost } from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private angularFirestore: AngularFirestore) {}

  getUserId(): string {
    if (localStorage.getItem('user')) {
      const { uid } = JSON.parse(localStorage.getItem('user')!);
      return uid;
    } else {
      return '';
    }
  }

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

  updatePost(data: any, id: string) {
    return this.angularFirestore.doc<IPost>(`posts/${id}`).update(data);
  }

  getMyPosts() {
    return this.angularFirestore
      .collection('posts', (ref) => ref.where('author', '==', this.getUserId()))
      .snapshotChanges();
  }

  getPost(id: string) {
    return this.angularFirestore.doc(`posts/${id}`).valueChanges();
  }

  deletePost(id: string) {
    return this.angularFirestore.doc<IPost>(`posts/${id}`).delete();
  }
}
