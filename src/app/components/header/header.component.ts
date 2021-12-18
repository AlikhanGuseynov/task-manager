import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {RoleEnum} from "../../enums/role.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User | undefined;
  isAdmin = false;
  isOpenMenu = false;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(event => {
      this.user = event;
      this.isAdmin = this.user.role === RoleEnum.ADMIN
    })
  }

  logOut() {
    this.authService.logOut()
  }
}
