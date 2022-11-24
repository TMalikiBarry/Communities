import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SocialMediaRoutingModule} from './social-media-routing.module';
import {PostsService} from "./services/posts.service";
import {PostsResolver} from "./resolvers/posts.resolver";
import {PostsListComponent} from './components/posts-list/posts-list.component';
import {PostComponent} from './components/post/post.component';


@NgModule({
  declarations: [
    PostsListComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    SocialMediaRoutingModule
  ],
  providers: [
    PostsService,
    PostsResolver,
  ]
})
export class SocialMediaModule { }
