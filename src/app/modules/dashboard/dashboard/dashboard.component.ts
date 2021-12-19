import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {TaskService} from "../../../services/task.service";
import {AuthService} from "../../../services/auth.service";
import {NavigationExtras, Router} from "@angular/router";
import {User} from "../../../models/user";
import {Task} from "../../../models/task";
import {RoleEnum} from "../../../enums/role.enum";
import {DatePipe} from "@angular/common";
import {TaskStatusEnum} from "../../../enums/task-status.enum";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  userList: User[] = [];
  taskList: Task[] = [];
  taskListCopy: Task[] = [];
  currentUser: User;
  activeUser: User;
  activeTask = 0;

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    private datePipe: DatePipe,
  ) {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.getData();
    })
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    this.userList = this.userService.getUserListByCompanyId(this.currentUser.companyId);
    this.taskList = this.taskService.getCompanyTaskList(this.currentUser.companyId);
    this.taskListCopy = this.taskService.getCompanyTaskList(this.currentUser.companyId);
    console.log(this.userList)
    this.filterByUser();
    this.activeUser = this.userList[0];
  }

  getStatus(status: TaskStatusEnum | undefined): string {
    if (status === TaskStatusEnum.NEW) {
      return 'New'
    } else if (status === TaskStatusEnum.DONE) {
      return 'Done'
    } else if (status === TaskStatusEnum.IN_PROGRESS) {
      return 'In progress'
    } else if (status === TaskStatusEnum.UAT) {
      return 'UAT'
    } else {
      return 'No status'
    }
  }


  setOpenTask(i: number) {
    this.activeTask = this.activeTask === i ? -1 : i;
  }

  getRole(userItem: User) {
    if (userItem?.role === RoleEnum.ADMIN) {
      return 'Admin';
    } else if (userItem?.role === RoleEnum.USER) {
      return 'User';
    } else {
      return ''
    }
  }

  getDate(lastLogin: number | undefined) {
    return this.datePipe.transform(lastLogin, 'dd-MM-yyyy')
  }

  getTime(lastLogin: number | undefined) {
    return this.datePipe.transform(lastLogin, 'HH:mm:ss')
  }

  selectActiveUser(user: User) {
    this.activeUser = user;
    this.filterByUser();
  }

  filterByUser() {
    this.taskList = this.taskListCopy.filter(task => {
      return task.performers.some(performer => performer?.id === this.activeUser?.id);
    })
  }


  goToDetail(task: Task) {
    const extras: NavigationExtras = {
      queryParams: {
        taskId: task.id
      }
    }
    this.router.navigate(['/task/list/'], extras)
  }
}
