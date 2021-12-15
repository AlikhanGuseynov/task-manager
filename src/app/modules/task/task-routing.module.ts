import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskListComponent} from "./task-list/task-list.component";
import {TaskAddComponent} from "./task-add/task-add.component";

const routes: Routes = [
  {path: 'list', component: TaskListComponent},
  {path: 'add', component: TaskAddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {
}
