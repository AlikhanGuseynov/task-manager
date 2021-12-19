import {Component, OnInit} from '@angular/core';
import {TaskStatusEnum} from "../../../enums/task-status.enum";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user";
import {ISelect, ISelectItem} from "../../../components/custom-select/custom-select.component";
import {NgForm} from "@angular/forms";
import {Task} from "../../../models/task";
import {TaskService} from "../../../services/task.service";
import {ToastService} from "../../../services/toast.service";
import {ToastTypeEnum} from "../../../enums/toast-type.enum";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {

  currentUser: User;
  userList: User[];
  userListForSelect: ISelect = {
    list: [],
  };
  formIsValid = true;
  selectedPerformers: ISelectItem[] = [];
  task = new Task();
  minDate: string | null = '';
  dateInput = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private taskService: TaskService,
    private toastService: ToastService,
    private datePipe: DatePipe,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.userList = this.userService.getUserListByCompanyId(this.currentUser.companyId);
      this.userListForSelect.list = this.userList?.map(e => {
        return {
          value: e.id,
          displayText: e?.userName + e?.surname
        }
      })
    })
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  performerHandler(event: ISelectItem[]) {
    this.selectedPerformers = event;
    this.formIsValid = true;
  }

  assignPerformers() {
    this.task.performers = [];
    this.userList.map(a => {
      this.selectedPerformers.map(b => {
        if (a.id === b.value) {
          this.task.performers.push(a);
        }
      })
    })
  }

  createTask(taskForm: NgForm) {
    this.assignPerformers();
    this.formIsValid = taskForm.form.value && this.task.performers.length > 0 && this.dateInput;
    if (this.formIsValid) {
      this.task.id = new Date().getTime();
      this.task.companyId = this.currentUser.companyId;
      this.task.creator = this.currentUser;
      this.task.status = TaskStatusEnum.NEW;
      this.task.createDate = new Date().getTime();
      this.taskService.addTask(this.task)
      this.router.navigate(['/task/list'])
      this.toastService.createToast('New task was added.', ToastTypeEnum.SUCCESS)
    }
  }

  dateInputHandle() {
    this.task.deadline = new Date(this.dateInput).getTime();
  }
}
