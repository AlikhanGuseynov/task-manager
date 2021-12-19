import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomSelectComponent} from "../../components/custom-select/custom-select.component";
import {ClickOutSideDirective} from "../../directives/click-out-side.directive";
import {NgxMaskModule} from "ngx-mask";


@NgModule({
  declarations: [
    CustomSelectComponent,
    ClickOutSideDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomSelectComponent,
    ClickOutSideDirective,
    NgxMaskModule
  ]
})
export class SharedModule {
}

