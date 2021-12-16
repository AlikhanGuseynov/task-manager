import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = {
    address: '',
    email: '',
    id: 0,
    mobile: '',
    organizationName: '',
    password: '',
    role: '',
    userName: '',
  }

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  save(form: NgForm) {
    this.user.id = new Date().getTime();
    this.user.email = form.form.controls.email.value;
    this.user.password = form.form.controls.password.value;
    this.user.mobile = form.form.controls.mobile.value;
    this.user.userName = form.form.controls.userName.value;
    this.user.address = form.form.controls.address.value;
    this.user.organizationName = form.form.controls.organizationName.value;
    this.authService.register(this.user)
  }
}
