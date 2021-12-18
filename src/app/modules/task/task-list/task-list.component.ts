import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TaskService} from "../../../services/task.service";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {Task} from "../../../models/task";
import {TaskStatusEnum} from "../../../enums/task-status.enum";
import {User} from "../../../models/user";
import {DatePipe} from "@angular/common";
import {ISelect, ISelectItem} from "../../../components/custom-select/custom-select.component";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, AfterViewInit {

  taskList: Task[] = [];
  currentTask: Task;
  currentUser: User;
  userList: User[];
  edit = false;
  minDate: string | null = '';
  formIsValid = true;
  taskStatusList = TaskStatusEnum;
  userListForSelect: ISelect = {
    list: [],
  };
  selectedPerformers: ISelectItem[] = [];
  defaultSelectedPerformers: number[] | string[] = [];

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private authService: AuthService,
    private datePipe: DatePipe,
  ) {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    })
    this.userList = this.userService.getUserListByCompanyId(this.currentUser.companyId);
    this.userListForSelect.list = this.userList?.map(e => {
      return {
        value: e.id,
        displayText: e?.userName + e?.surname
      }
    })
  }

  getTaskList() {
    this.taskList = this.taskService.getCompanyTaskList(this.currentUser.companyId);
    this.currentTask = {...this.taskList[0]}
  }

  ngOnInit(): void {
    this.getTaskList();
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
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

  performerHandler(event: ISelectItem[]) {
    this.selectedPerformers = event;
    this.formIsValid = true;
  }


  saveChanges() {
    this.edit = false;
  }

  getFormattedDate(date: number): string {
    return <string>this.datePipe.transform(new Date(date), 'yyyy-MM-dd');
  }

  dateInputHandle() {

  }

  editToggle() {
    this.edit = true;
    this.defaultSelectedPerformers = this.currentTask.performers.map(item => {
      return item.id
    })
  }
}
