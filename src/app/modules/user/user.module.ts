import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserAddComponent } from './user-add/user-add.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserAddComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
