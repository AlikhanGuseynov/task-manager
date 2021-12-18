import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskAddComponent } from './task-add/task-add.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    TaskListComponent,
    TaskAddComponent
  ],
    imports: [
        CommonModule,
        TaskRoutingModule,
        SharedModule,
    ]
})
export class TaskModule { }
