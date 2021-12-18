import {Injectable} from '@angular/core';
import {Task} from "../models/task";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {filter, map} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {TaskMock} from "../mocks/task.mock";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskList: Task[] = [...TaskMock];
  currentUser: User = new User()

  constructor(
    private authService: AuthService
  ) {
    this.authService.getCurrentUser().subscribe(e => {
      this.currentUser = e;
    })
  }

  getCompanyTaskList(companyId: number) {
    console.log(
      this.taskList.filter(e => {
          return e.companyId === companyId;
        })
    )
    return this.taskList.filter(e => {
      return e.companyId === companyId;
    })
  }


}
