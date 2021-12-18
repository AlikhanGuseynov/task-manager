import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomSelectComponent} from "../../components/custom-select/custom-select.component";


@NgModule({
  declarations: [
    CustomSelectComponent
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
    CustomSelectComponent
  ]
})
export class SharedModule {
}

