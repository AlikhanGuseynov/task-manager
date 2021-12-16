import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../../models/user";
import {NgForm} from "@angular/forms";
import {RoleEnum} from "../../../enums/role.enum";
import {ToastService} from "../../../services/toast.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  userId: number = 0;
  user: User = new User()
  formIsValid = true;
  ROLE_ENUM = RoleEnum;
  testUser = new User('admin@admin.com', 123, 'admin@admin.com', 'admin@admin.com', 'admin@admin.com',
    'admin@admin.com', 'admin@admin.com', 'admin@admin.com', 'admin@admin.com', RoleEnum.USER, 123)
  passwordRegex = /^[a-zA-Z0-9]+$/

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private userServices: UserService,
  ) {
    this.route.params.subscribe((params: Params) => {
      this.userId = params.id;
      if (params.id) {
        this.userId = params.id;
        const user = this.userServices.getUserList()?.find(e => {
          return e.id === +this.userId
        });
        if (user) {
          this.user = user
        } else {
          this.user = new User();
        }
      }
    })
  }

  ngOnInit(): void {

  }

  togglePassword(password: HTMLInputElement) {
    password.type = password.type === 'password' ? 'text' : 'password';
  }

  saveEdit(userForm: NgForm) {
    this.formIsValid = userForm.form.valid;
    if (this.formIsValid) {
      const result = this.userServices.putUser(this.user)
      if (result) {
        this.user = new User();
        this.router.navigate(['/user/list']);
      }
    }
  }

  createPassword(userForm: NgForm) {
    if (!userForm.form.controls.password.touched) {
      if (userForm.form.controls.email.valid && userForm.form.controls.email.valid) {
        this.user.password = this.user.email.split('@')[0] + Math.floor(Math.random() * (999 - 1) + 1);
      }
    }
  }

  createRandomPassword() {
    this.user.password = Math.random().toString(36).slice(-8)
  }

  addUser(userForm: NgForm) {
    this.formIsValid = userForm.form.valid;
    if (this.formIsValid) {
      this.user.id = new Date().getTime();
      const result = this.userServices.setUser(this.user)
      if (result) {
        this.user = new User();
        this.formIsValid = true;
      }
    }
  }

  testUserCreate() {
    this.user = {...this.testUser}
    this.userServices.setUser(this.user)
  }
}
