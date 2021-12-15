import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList = [
    'Some text', 'Some text', 'Some text', 'Some text', 'Some text', 'Some text', 'Some text',
  ]
  taskList = [
    'Some text', 'Some text', 'Some text', 'Some text', 'Some text', 'Some text', 'Some text',
    'Some text', 'Some text', 'Some text', 'Some text', 'Some text', 'Some text', 'Some text',
    'Some text', 'Some text', 'Some text', 'Some text', 'Some text', 'Some text', 'Some text',
    'Some text', 'Some text', 'Some text', 'Some text', 'Some text', 'Some text', 'Some text',
    'Some text', 'Some text', 'Some text', 'Some text', 'Some text', 'Some text', 'Some text',
  ]

  activeUser = 1;
  activeTask = 1;

  constructor() {
  }

  ngOnInit(): void {
  }


  setOpenTask(i: number) {
    this.activeTask = this.activeTask === i ? -1 : i;
  }
}
