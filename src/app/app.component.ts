import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {UsersService} from './services/users.service';
import {ThmedicalappoitmentsService} from "./services/thmedicalappoitments.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UsersService,
    private medical: ThmedicalappoitmentsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    // this.userService.appoitments$.subscribe((data) => {
    //   console.log('this.userService.appoitments$');
    //   console.log(data);
    // })

    this.medical.getAll();

    this.medical.appoitments$.subscribe((response) => {
      console.log(response);
    });
  }

  create() {
    this.userService.create();
  }
}
