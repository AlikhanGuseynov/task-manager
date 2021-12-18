import {Component, OnInit} from '@angular/core';
import {TaskStatusEnum} from "../../../enums/task-status.enum";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user";
import {ISelect} from "../../../components/custom-select/custom-select.component";

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {

  taskStatusList = TaskStatusEnum;
  isEdit = false;
  currentUser: User;
  userList: User[];
  userListForSelect: ISelect = {
    list: []
  };

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.userList = this.userService.getUserListByCompanyId(this.currentUser.companyId);
      this.userListForSelect.list = this.userList?.map(e => {
        return {
          value: e.id,
          displayText: e.userName + e.surname
        }
      })
    })
  }


}
