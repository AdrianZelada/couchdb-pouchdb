import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  users$: Observable<any>;
  constructor(private userService: UsersService) {

  }

  ngOnInit() {
    console.log("this.userService.users$", this.userService.users$);
    // this.users$ = this.userService.getUsers();
  }

  async getAll() {
    console.log('getALL HOME PAGE');
    const users = await this.userService.getUsers();
    console.log('users', users);
    this.users$ = users.rows;
  }

}
