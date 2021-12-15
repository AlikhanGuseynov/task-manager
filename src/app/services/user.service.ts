import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList$: Subject<User[]> = new Subject<User[]>();
  userList: User[] = [];

  constructor() {
  }

  getUsers(): Observable<User[]> {
    return this.userList$.asObservable();
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
