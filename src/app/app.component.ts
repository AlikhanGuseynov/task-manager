import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLogin = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.getIsLogin().subscribe(event => {
      this.isLogin = event;
      if (!this.isLogin) {
        // this.router.navigate(['/auth/login'])
      }
    })
  }
}
