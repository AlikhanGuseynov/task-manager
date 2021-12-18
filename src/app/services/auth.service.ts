import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../models/user";
import {Login} from "../models/login";
import {UserService} from "./user.service";
import {UserMock} from "../mocks/user.mock";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = false;
  isLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  currentUser: User = new User();
  currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(new User())

  constructor(
    private userServices: UserService,
    private router: Router
  ) {
    const defaultUser = UserMock[0];
    // this.login({email: defaultUser.email, password: defaultUser.password})
  }

  login(params: Login) {
    const user = this.userServices.getUserList().find(item => {
      return item.email === params.email && item.password === params.password;
    })
    if (user) {
      this.setCurrentUser(user);
    }
    return user;
  }

  logOut() {
    this.currentUser = new User();
    this.currentUser$.next(this.currentUser)
    this.setIsLogin(false)
    this.router.navigate(['/auth/login'])
  }

  getIsLogin(): Observable<boolean> {
    return this.isLogin$.asObservable()
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    this.currentUser$.next(this.currentUser)
    this.setIsLogin(true)
  }

  setIsLogin(state: boolean) {
    this.isLogin = state;
    this.isLogin$.next(this.isLogin)
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser$.asObservable()
  }

  register(user: User) {
    this.userServices.setUser(user);
  }


}
