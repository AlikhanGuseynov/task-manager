import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TaskService} from "../../../services/task.service";
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
export class TaskListComponent implements OnInit, AfterViewInit {

  taskList: Task[] = [];
  currentTask: Task;
  currentUser: User;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    })
  }

  getTaskList() {
    this.taskList = this.taskService.getCompanyTaskList(this.currentUser.companyId);
    this.currentTask = {...this.taskList[0]}
  }

  ngOnInit(): void {
    this.getTaskList();
  }

  ngAfterViewInit() {
    this.getTaskList();
  }

  // @ts-ignore
  getStatus(status: TaskStatusEnum | undefined): string {
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
