import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../../core/models/comment";
import {FormBuilder, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        backgroundColor: 'white',
        zIndex: 1
      })),
      state('hover', style({
        transform: 'scale(1.1)',
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2
      })),
      transition('default => hover', [
        animate('200ms ease-in-out')
      ]),
      transition('hover => default', [
        animate('400ms ease-in-out')
      ]),

      // [void => *, :enter] du vide vers n'importe quel état.
      // [* => void, :leave] de n'importe quel état vers le vide.
      // void<=>* les deux sens
      transition('void => *', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
          'background-color': 'rgb(201, 157, 242)'
        }),
        animate('350ms ease-out', style({
          transform: 'translateX(0%)',
          opacity: 1,
          'background-color': 'white'
        }))
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit {

  @Input() comments!: Comment[];
  @Output() newComment= new EventEmitter<string>;

  // listItemAnimationsState: 'default' | 'hover' = 'default';

  animationStates: {[key: number]: 'default' | 'hover'} = {};

  commentControl = this.fb.control('', [Validators.required, Validators.minLength(15)]);

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    for (let index in this.comments){
      this.animationStates[index] = 'default';
    }
  }

  onLeaveComment() {
    if (this.commentControl.invalid || !this.commentControl.value){
      return;
    }
    const maxId = Math.max(...this.comments.map((item)=>item.id));
    this.comments.unshift({
      id: maxId + 1,
      comment: this.commentControl.value,
      createdDate: new Date().toISOString(),
      userId: 1
    })
    this.newComment.emit(this.commentControl.value);
    this.commentControl.reset();
  }

  onMouseEnter(index: number){
    // this.listItemAnimationsState = 'hover'
    this.animationStates[index] = 'hover';
  }

  onMouseLeave(i: number){
    // this.listItemAnimationsState = 'default';
    this.animationStates[i] = 'default';
  }
}
