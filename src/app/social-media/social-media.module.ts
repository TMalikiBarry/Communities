import {NgModule} from '@angular/core';

import {SocialMediaRoutingModule} from './social-media-routing.module';
import {PostsService} from "./services/posts.service";
import {PostsResolver} from "./resolvers/posts.resolver";
import {PostsListComponent} from './components/posts-list/posts-list.component';
import {PostComponent} from './components/post/post.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    PostsListComponent,
    PostComponent
  ],
  imports: [
    SharedModule,
    SocialMediaRoutingModule
  ],
  providers: [
    PostsService,
    PostsResolver,
  ]
})
export class SocialMediaModule { }
