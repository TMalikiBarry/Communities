import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentsComponent} from './components/comments/comments.component';
import {MaterialModule} from "./material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ShortenPipe} from "./pipes/shorten.pipe";
import {FormatNamePipe} from './pipes/format-name.pipe';
import {TimeAgoPipe} from "./pipes/timeAgo.pipe";
import {HighlightDirective} from "./directives/highlight.directive";


@NgModule({
  declarations: [
    CommentsComponent,
    HighlightDirective,
    ShortenPipe,
    FormatNamePipe,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    CommentsComponent,
    MaterialModule,
    ReactiveFormsModule,
    HighlightDirective,
    ShortenPipe,
    FormatNamePipe,
    TimeAgoPipe
  ]
})
export class SharedModule { }
