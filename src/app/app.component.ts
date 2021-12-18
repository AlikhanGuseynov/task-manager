import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {ToastData, ToastService} from "./services/toast.service";
import {ToastTypeEnum} from "./enums/toast-type.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLogin = false;
  toast: ToastData | undefined;
  toastTypeEnum = ToastTypeEnum

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.authService.getIsLogin().subscribe(event => {
      this.isLogin = event;
      if (!this.isLogin) {
        this.router.navigate(['/auth/login'])
      }
    })
    this.toastService.getToast().subscribe(data => {
      this.toast = data;
    })
  }

  deleteToast() {
    this.toastService.deleteToast();
  }
}
