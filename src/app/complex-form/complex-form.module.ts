import {NgModule} from '@angular/core';

import {ComplexFormRoutingModule} from './complex-form-routing.module';
import {SharedModule} from "../shared/shared.module";
import {ComplexFormComponent} from './components/complex-form/complex-form.component';
import {ComplexFormService} from "./services/complex-form.service";

@NgModule({
  declarations: [
    ComplexFormComponent
  ],
  imports: [
    ComplexFormRoutingModule,
    SharedModule
  ],
  providers: [ComplexFormService]
})
export class ComplexFormModule {
}
