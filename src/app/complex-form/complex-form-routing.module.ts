import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComplexFormComponent} from "./components/complex-form/complex-form.component";

const routes: Routes = [
  {path: '', pathMatch: "full", component: ComplexFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplexFormRoutingModule {
}
