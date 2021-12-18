import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomSelectComponent} from "../../components/custom-select/custom-select.component";
import {ClickOutSideDirective} from "../../directives/click-out-side.directive";


@NgModule({
  declarations: [
    CustomSelectComponent,
    ClickOutSideDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomSelectComponent,
    ClickOutSideDirective
  ]
})
export class SharedModule {
}

