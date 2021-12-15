import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {UserAddComponent} from "./user-add/user-add.component";

const routes: Routes = [
  {path: 'list', component: UserListComponent},
  {path: 'add', component: UserAddComponent},
  {path: 'edit', component: UserAddComponent},
  {path: 'details', component: UserDetailsComponent},
  {path: '', redirectTo: '/user/list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
