import {Component, OnInit} from '@angular/core';
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
    this.authService.getCurrentUser().subscribe(event => {
      this.user = event;
    })
  }

  ngOnInit(): void {

  }

}
