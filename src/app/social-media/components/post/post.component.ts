import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../models/post.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  @Output() postCommented = new EventEmitter;

  constructor() {
  }

  ngOnInit(): void {
  }

  onNewComment(comment: string) {
    // console.log(comment);
    this.postCommented.emit({comment, postId: this.post.id});
  }
}
