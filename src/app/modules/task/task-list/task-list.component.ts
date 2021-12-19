import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TaskService} from "../../../services/task.service";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {Task} from "../../../models/task";
import {TaskStatusEnum} from "../../../enums/task-status.enum";
import {User} from "../../../models/user";
import {DatePipe} from "@angular/common";
import {ISelect, ISelectItem} from "../../../components/custom-select/custom-select.component";
import {NgForm} from "@angular/forms";
import {ToastTypeEnum} from "../../../enums/toast-type.enum";
import {ToastService} from "../../../services/toast.service";
import {ActivePerfRecorder} from "@angular/compiler-cli/src/ngtsc/perf";
import {ActivatedRoute} from "@angular/router";

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
  taskId: number;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private toastService: ToastService,
    private route: ActivatedRoute
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
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams?.taskId) {
        this.taskId = Number(queryParams?.taskId);
      }
    })
  }

  openTaskById() {
    this.currentTask = <Task>this.taskList.find(task => {
      return task.id === this.taskId;
    })
  }

  getTaskList() {
    this.taskList = this.taskService.getCompanyTaskList(this.currentUser?.companyId);
    this.currentTask = {...this.taskList[0]}
    this.defaultSelectedPerformers = this.currentTask?.performers?.map(item => {
      return item.id
    })
    if (this.taskId) {
      this.openTaskById();
    }
  }

  ngOnInit(): void {
    this.getTaskList();
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngAfterViewInit() {
    this.getTaskList();
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

  performerHandler(event: ISelectItem[]) {
    this.selectedPerformers = event;
    this.formIsValid = true;
    this.assignPerformers();
  }

  selectTask(task: Task) {
    this.cancelChanges(task.id);
    this.currentTask = {...task};
    this.defaultSelectedPerformers = this.currentTask.performers.map(item => {
      return item.id
    })
  }

  saveChanges(taskForm: NgForm) {
    this.formIsValid = taskForm.form.valid && this.currentTask.performers.length > 0;
    if (this.formIsValid) {
      this.edit = false;
      this.currentTask.status = Number(this.currentTask.status);
      const changed = this.taskService.editTask(this.currentTask)
      if (changed) {
        this.toastService.createToast('Task was changed', ToastTypeEnum.SUCCESS);
        this.taskList = this.taskService.getCompanyTaskList(this.currentUser.companyId);
      } else {
        this.toastService.createToast('Error', ToastTypeEnum.ERROR)
      }
      this.formIsValid = true;
    }
  }

  getFormattedDate(date: number): string {
    return <string>this.datePipe.transform(new Date(date), 'yyyy-MM-dd');
  }

  dateInputHandle(event: Event) {
    // @ts-ignore
    this.currentTask.deadline = new Date(event.target.value).getTime();
  }

  editToggle() {
    this.edit = true;
    this.defaultSelectedPerformers = this.currentTask.performers.map(item => {
      return item.id
    })
  }

  assignPerformers() {
    this.currentTask.performers = [];
    this.userList.map(a => {
      this.selectedPerformers.map(b => {
        if (a.id === b.value) {
          this.currentTask.performers.push(a);
        }
      })
    })
  }

  cancelChanges(taskId: number) {
    this.edit = false;
    this.currentTask = <Task>this.taskList.find(e => {
      return e.id === taskId
    })
  }
}
