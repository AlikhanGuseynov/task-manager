import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {NgForm} from "@angular/forms";
import {RoleEnum} from "../../../enums/role.enum";
import {User} from "../../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = new User();
  formIsValid = true;
  emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  passwordRegex = /^[a-zA-Z0-9]+$/

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  save(form: NgForm) {
    this.formIsValid = form.form.valid;

    if (this.formIsValid){
      this.user.id = new Date().getTime();
      this.user.role = RoleEnum.ADMIN;
      this.user.accountCreator = true;

      if (this.authService.register(this.user)) {
        this.router.navigate(['/auth/login'])
      }
    }



  }
}
