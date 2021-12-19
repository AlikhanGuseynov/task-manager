import {Component, OnInit} from '@angular/core';
import {Login} from "../../../models/login";
import {AuthService} from "../../../services/auth.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {RoleEnum} from "../../../enums/role.enum";
import {ToastService} from "../../../services/toast.service";
import {ToastTypeEnum} from "../../../enums/toast-type.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: Login = {
    email: '',
    password: ''
  };
  emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  formIsValid = true;
  passwordRegex = /^[a-zA-Z0-9]+$/

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.authService.logOut();
  }

  login(form: NgForm) {
    this.formIsValid = form.form.valid;
    if (this.formIsValid) {
      const loginForm: Login = {
        email: form.form.controls.email.value,
        password: form.form.controls.password.value,
      }
      const loginResult = this.authService.login(loginForm);
      if (loginResult && loginResult.role === RoleEnum.ADMIN) {
        this.router.navigate(['/dashboard'])
      } else if (loginResult && loginResult.role === RoleEnum.USER) {
        this.router.navigate(['/task'])
      } else {
        this.toastService.createToast('Email or password invalid.', ToastTypeEnum.ERROR)
      }
    }
  }
}
