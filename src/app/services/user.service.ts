import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../models/user";
import {UserMock} from "../mocks/user.mock";

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

  getUsersList(): User[] {
    return this.userList;
  }

  setUser(user: User): void {
    this.userList.push(user);
    this.userList$.next(this.userList);
  }

  getUserById(id: number): User | undefined {
    return this.userList.find((e: User) => {
      return e.id === id;
    });
  }


}
