import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {User} from "../models/user";
import {RoleEnum} from "../enums/role.enum";

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  user = new User();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.user.role === RoleEnum.ADMIN;
  }
}
