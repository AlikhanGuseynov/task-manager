import {Component, OnInit} from '@angular/core';
import {Login} from "../../../models/login";
import {AuthService} from "../../../services/auth.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    const loginForm: Login = {
      email: form.form.controls.email.value,
      password: form.form.controls.password.value,
    }
    if (this.authService.login(loginForm)) {
      this.router.navigate(['/dashboard'])
    }
  }

}
