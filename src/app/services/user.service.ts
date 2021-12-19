import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {UserMock} from "../mocks/user.mock";
import {ToastService} from "./toast.service";
import {ToastTypeEnum} from "../enums/toast-type.enum";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: User[] = [...UserMock];

  constructor(
    private toastService: ToastService,
  ) {
  }

  getUserList(): User[] {
    return this.userList;
  }

  getUserListByCompanyId(companyId: number): User[] {
    return this.userList.filter(user => {
      return user.companyId === companyId
    })
  }

  setUser(user: User): boolean {
    const sameUser = this.userList.find(e => {
      return e.email === user.email
    })
    if (sameUser) {
      this.toastService.createToast('This user already exist.', ToastTypeEnum.ERROR)
      return false;
    } else {
      this.userList.push({...user})
      this.toastService.createToast('New user vas add.', ToastTypeEnum.SUCCESS)
      return true;
    }
  }

  putUser(user: User): boolean {
    let userIsChange = false;
    this.userList = this.userList.map(event => {
      if (event.companyId === user.companyId && event.id === user.id) {
        event = user;
        userIsChange = true;
      }
      return event;
    })
    return userIsChange;
  }

  deleteUserById(id: number) {
    this.userList.filter(user => {
      return user.id !== id;
    })
  }

  getUserById(userId: number): User | undefined {
    return this.userList.find(user => {
      return user.id === userId
    })
  }

}
