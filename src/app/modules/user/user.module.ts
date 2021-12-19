import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    UserListComponent,
    UserAddComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule,
    ]
})
export class UserModule { }
