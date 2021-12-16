import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../models/user";
import {Login} from "../models/login";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = false;
  isLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  currentUser: User | undefined;
  currentUser$: Subject<User> = new Subject<User>()

  constructor(
    private userServices: UserService
  ) {
  }

  login(params: Login) {
    const user = this.userServices.getUsersList().find(item => {
      return item.email === params.email && item.password === params.password;
    })
    if (user) {
      this.setCurrentUser(user);
    }
    return user;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    this.currentUser$.next(this.currentUser)
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser$.asObservable()
  }


  register(user: User) {
    this.userServices.setUser(user);
  }


}
