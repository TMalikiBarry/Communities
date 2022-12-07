import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {exhaustMap, map, Observable, tap} from "rxjs";
import {Post} from "../models/post.model";
import {environment} from "../../../environments/environment";
import {Comment} from "../../core/models/comment";

@Injectable()
export class PostsService {

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiURL}/posts`);
  }

  pickUserId(): number {
    const id = Math.floor(Math.random() * 1000);
    return id === 0 ? 1 : id;
  }

  newCommentsTable(comments: Comment[], comment: string): Comment[] {
    const maxId = Math.max(...comments.map((item) => item.id));
    comments.unshift(<Comment>{
      id: maxId + 1,
      comment,
      createdDate: new Date().toISOString(),
      userId: this.pickUserId()
    })
    return comments
  }

  getPostById(postId: number) {
    return this.http.get<Post>(`${environment.apiURL}/posts/${postId}`);
  }

  addComment(postCommented: { comment: string, postId: number }) {
    console.log(postCommented);
    return this.getPostById(postCommented.postId).pipe(
      tap(() => console.log('recup le post poto...')),
      map(postToUpdate => ({
        id: postToUpdate.id,
        userId: postToUpdate.userId,
        title: postToUpdate.title,
        createdDate: postToUpdate.createdDate,
        content: postToUpdate.content,
        imageUrl: postToUpdate.imageUrl,
        comments: this.newCommentsTable(postToUpdate.comments, postCommented.comment)
        /*comments: [...Array.from(postToUpdate.comments), {
          id: postToUpdate.comments.length + 100,
          comment:postCommented.comment,
          createdDate: (new Date()).toString(),
          userId: 980
        }]*/
      })),
      tap(()=> console.log('en cours de tratiment ...')),
      exhaustMap(updatedPost => this.http.put<Post>(`${environment.apiURL}/posts/${updatedPost.id}`, updatedPost) )
    )
  }
}
