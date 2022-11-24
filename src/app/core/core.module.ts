import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
