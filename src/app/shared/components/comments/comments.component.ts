import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../../core/models/comment";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>;

  commentControl = this.fb.control('', [Validators.required, Validators.minLength(15)]);

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onLeaveComment() {
    if (this.commentControl.invalid || !this.commentControl.value) {
      return;
    }
    this.newComment.emit(this.commentControl.value);
    this.commentControl.reset();
  }
}
