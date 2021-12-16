import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User | undefined;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(event => {
      this.user = event;
    })
  }

  logOut() {
    const user: User = {
      address: 'string',
      email: 'string',
      id: 0,
      mobile: 'string',
      organizationName: 'string',
      password: 'string',
      role: 'string',
      userName: 'string',
    }
    this.authService.setCurrentUser(user)
  }
}
