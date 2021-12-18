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
  userList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.userList);

  constructor(
    private toastService: ToastService,
  ) {
  }

  getUsers(): Observable<User[]> {
    return this.userList$.asObservable();
  }

  getUserList(): User[] {
    return this.userList;
  }

  setUser(user: User): boolean {
    const sameUser = this.userList.find(e => {
      return e.email === user.email
    })
    this.userList.map(e => {
      if (e.email === user.email) {
        console.log(e.email, user.email)
      }
    })
    user.role = user?.role ? +user?.role : undefined;
    if (sameUser) {
      this.toastService.createToast('This user already exist.', ToastTypeEnum.INFO)
      return false
    } else {
      this.userList.push({...user});
      this.userList$.next(this.userList);
      this.toastService.createToast('User was added.')
      return true;
    }
  }

  putUser(user: User) {
    let isChanged = false;
    this.userList.map(event => {
      if (event.id === user.id) {
        event = user;
        isChanged = true;
      }
    })
    if (isChanged) {
      this.userList$.next(this.userList);
      this.toastService.createToast('User was changed success.', ToastTypeEnum.SUCCESS)
      return true;
    } else {
      this.toastService.createToast('We have problem to change  user date.', ToastTypeEnum.ERROR)
      return false;
    }
  }

  deleteUserById(id: number) {
    this.userList = this.userList.filter(item => {
      return item.id !== id
    })
    this.userList$.next(this.userList)
  }

  getUserById(id: number): User | undefined {
    return this.userList.find((e: User) => {
      return e.id === id;
    });
  }


}
