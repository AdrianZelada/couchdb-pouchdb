import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];

  users$: Observable<any> = new Observable<any>();
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(public userService: UsersService) {
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
    this.userService.getAll();
  }

  ngOnInit() {
    this.users$ = this.userService.users$
      .pipe(
        map((resp) => {
          return  resp.map((item: any, i) => {
              return {
                  id: Date.now(),
                  title: 'Item ' + item.doc.name,
                  note: 'This is item #' + item.doc.name,
                  icon: this.icons[Math.floor(Math.random() * this.icons.length)]
              };
          }) || [];
        })
      );
    // this.userService.users$.subscribe((data) => {
    //   console.log('userService.users$');
    //   console.log(data);
    //   const response = data.map((item: any, i) => {
    //     return {
    //         title: 'Item ' + item.doc.name,
    //         note: 'This is item #' + i,
    //         icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //     };
    //   }) || [];
    //
    //   this.items = [
    //     ...response
    //   ];
    //
    //     console.log(this.items);
    // });
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
