import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {Post} from "../../models/post.model";
import {ActivatedRoute} from "@angular/router";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  posts$!: Observable<Post[]>;

  constructor(private route: ActivatedRoute,
              private psService: PostsService) {
  }

  ngOnInit(): void {

    this.posts$ = this.route.data.pipe(
      map((data) => data['posts']),
    );
  }

  onPostCommented(commentedPost: { comment: string, postId: number }) {
    this.psService.addComment(commentedPost);
  }
}
