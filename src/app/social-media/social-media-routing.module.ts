import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostsListComponent} from "./components/posts-list/posts-list.component";
import {PostsResolver} from "./resolvers/posts.resolver";

const routes: Routes = [
  {path: '', component: PostsListComponent, resolve: {posts: PostsResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialMediaRoutingModule {
}
