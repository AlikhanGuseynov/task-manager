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
  userListCopy: User[] | undefined;

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
      this.userListCopy = event;
    })
  }

  getSolvedTasks(a: number | undefined, b: number | undefined) {
    return a && b ? (a - b) : 0
  }

  getRole(userItem: User) {
    console.log(userItem?.role)
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

  filter(filterInput: HTMLInputElement) {
    this.userList = this.userListCopy?.filter(item => {
      return this.filterCheck(item, filterInput.value);
    })
  }

  filterCheck(user: User, filterValue: string): boolean {
    let checkingParams = '';
    Object.keys(user).map(key => {
      if (
        key === 'mobile' || key === 'address' || key === 'userName'
        || key === 'surname' || key === 'email' || key === 'position' || key === 'department'
      ) {
        checkingParams = checkingParams + ' ' + user[key]
      } else if (key === 'lastLogin') {
        checkingParams = checkingParams + ' ' + this.datePipe.transform(user[key], 'dd-MM-yyyy HH:mm:ss')
      }
    })
    return JSON.stringify(checkingParams).toLowerCase().includes(filterValue.toLowerCase());
  }


}
