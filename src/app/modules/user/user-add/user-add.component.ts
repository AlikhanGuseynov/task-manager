import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {User} from "../../../models/user";
import {NgForm, NgModel} from "@angular/forms";
import {RoleEnum} from "../../../enums/role.enum";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  userId: number = 0;
  user = new User()
  formIsValid = true;
  ROLE_ENUM = RoleEnum;

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => {
      this.userId = params.id;
    })
  }

  ngOnInit(): void {

  }

  togglePassword(password: HTMLInputElement) {
    password.type = password.type === 'password' ? 'text' : 'password';
  }

  saveEdit() {

  }

  addUser(userForm: NgForm) {
    this.formIsValid = userForm.form.valid;
    if (this.formIsValid) {

    }
  }
}
