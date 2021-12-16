import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../../services/task.service";
import {map} from "rxjs/operators";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {Task} from "../../../models/task";
import {TaskStatusEnum} from "../../../enums/task-status.enum";
import {User} from "../../../models/user";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  taskList: Task[] = [];
  // @ts-ignore
  currentTask: Task;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.authService.getCurrentUser().subscribe(user => {
      this.taskService.getTasks().pipe(
        map(results => results.filter(r => r.companyId === user?.companyId))
      )
        .subscribe((e) => {
          this.taskList = e;
          this.currentTask = this.taskList[0]
        })
    })
  }

  ngOnInit(): void {


  }

  // @ts-ignore
  getStatus(status: TaskStatusEnum): string {
    if (status === TaskStatusEnum.NEW) {
      return 'New'
    } else if (status === TaskStatusEnum.DONE) {
      return 'Done'
    } else if (status === TaskStatusEnum.IN_PROGRESS) {
      return 'In progress'
    } else if (status === TaskStatusEnum.UAT) {
      return 'UAT'
    }
  }

  getPerformer(performer: User[]) {
    // @ts-ignore
    return performer.reduce(reducer, '')

    function reducer(previousValue: string, currentValue: User) {
      return previousValue + ' ,' + currentValue.userName
    }
  }
}
