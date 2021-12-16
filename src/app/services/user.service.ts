import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../models/user";
import {UserMock} from "../mocks/user.mock";
import {summaryFileName} from "@angular/compiler/src/aot/util";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: User[] = [...UserMock];
  userList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.userList);

  constructor() {
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
    if (sameUser) {
      return false
    } else {
      this.userList.push(user);
      this.userList$.next(this.userList);
      return true
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
