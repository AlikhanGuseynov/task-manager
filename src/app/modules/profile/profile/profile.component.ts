import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {NgForm} from "@angular/forms";
import {ToastTypeEnum} from "../../../enums/toast-type.enum";
import {ToastService} from "../../../services/toast.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user = new User();
  edit = false;
  formIsValid = true;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToastService,
  ) {
    this.getUserData()
  }

  getUserData() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = {...user};
      console.log(user)
    })
  }

  ngOnInit(): void {
  }

  cancel() {
    this.edit = false;
    this.getUserData();
  }


  save(profileForm: NgForm) {
    this.formIsValid = profileForm.form.valid;
    if (this.formIsValid) {
      const changed = this.userService.putUser(this.user);
      if (changed) {
        this.toastService.createToast('User was changed.', ToastTypeEnum.SUCCESS);
        this.authService.setCurrentUser(this.user);
      } else {
        this.toastService.createToast('Error.', ToastTypeEnum.ERROR)
      }
      this.edit = false;
    }
  }


}
