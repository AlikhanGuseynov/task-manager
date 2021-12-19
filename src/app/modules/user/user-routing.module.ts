import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {UserAddComponent} from "./user-add/user-add.component";
import {GuardService} from "../../services/guard.service";

const routes: Routes = [
  {path: 'list', component: UserListComponent},
  {path: 'add', component: UserAddComponent},
  {path: 'edit/:id', component: UserAddComponent},
  {path: '', redirectTo: '/user/list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
