import {Injectable} from '@angular/core';
import {Task} from "../models/task";
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
    return this.taskList.filter(e => {
      return e.companyId === companyId;
    })
  }

  addTask(task: Task) {
    this.taskList.push({...task})
  }

  editTask(task: Task): boolean {
    let changed = false;
    this.taskList = this.taskList.map(e => {
      if (e.id === task.id) {
        e = task;
        changed = true
      }
      return e;
    })
    console.log(this.taskList)
    return changed;
  }


}
