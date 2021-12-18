import {AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {RoleEnum} from "../../../enums/role.enum";
import {DatePipe} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  userList: User[] | undefined;
  userListCopy: User[] | undefined;
  user = new User();

  constructor(
    private userService: UserService,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {
    this.authService.getCurrentUser()
      .subscribe(user => {
        this.user = user;
      })
    this.getUserList()

  }

  ngOnInit(): void {
    this.getUserList()
  }

  ngAfterViewInit() {
    this.getUserList()
    console.log(0)
  }

  getUserList() {
    const userList = this.userService.getUserListByCompanyId(this.user.companyId);
    this.userList = [...userList];
    this.userListCopy = [...userList];
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
