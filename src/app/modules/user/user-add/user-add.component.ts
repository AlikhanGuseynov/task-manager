import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  userId: number = 0;

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => {
      this.userId = params.id;
    })
  }

  ngOnInit(): void {
  }

  addUser() {
    console.log('save')
  }

  togglePassword(password: HTMLInputElement) {
    password.type = password.type === 'password' ? 'text' : 'password';
  }
}
