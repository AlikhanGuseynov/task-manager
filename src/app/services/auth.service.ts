import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../models/user";
import {Login} from "../models/login";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login = false;
  login$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser: User | undefined;
  currentUser$: Subject<User> = new Subject<User>();

  constructor(
    private userServices: UserService
  ) {
  }

  logIn(params: Login) {
    this.userServices.getUsers().subscribe(event => {
      let user = event.find(event => {
        return event.email === params.email && event.password === params.password
      });
      if (user) {
        this.currentUser = user;
        this.currentUser$.next(this.currentUser);
        this.login = true;
        this.login$.next(this.login);
        return this.currentUser;
      } else {
        this.currentUser$.next(this.currentUser)
        this.login = false;
        this.login$.next(this.login);
        return undefined;
      }
    })
  }

  signUp(user: User) {
    this.userServices.setUser(user);
  }

  // @ts-ignore
  getUser(): Observable<User> | undefined {
    this.login$.subscribe(event => {
      if (event) {
        return this.currentUser$.asObservable();
      } else {
        return undefined;
      }
    })
  }


}
