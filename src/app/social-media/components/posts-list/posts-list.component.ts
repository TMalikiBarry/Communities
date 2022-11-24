import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {Post} from "../../models/post.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  posts$!: Observable<Post[]>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.posts$ = this.route.data.pipe(
      map((data) => data['posts']),
    );
  }

}
