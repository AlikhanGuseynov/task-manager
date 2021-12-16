import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {RoleEnum} from "../../../enums/role.enum";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: User[] | undefined;

  constructor(
    private userService: UserService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.getUserList()
  }

  getUserList() {
    this.userService.getUsers().subscribe(event => {
      this.userList = event;
    })
  }

  getSolvedTasks(a: number | undefined, b: number | undefined) {
    return a && b ? (a - b) : 0
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
}
