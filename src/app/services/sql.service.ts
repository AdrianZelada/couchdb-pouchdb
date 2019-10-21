import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { SQLite } from '@ionic-native/sqlite/ngx';


import { browserDBInstance } from './browser.service';


declare var window: any;
const SQL_DB_NAME = 'dev' === 'dev' ? '__broswer.db' : '__native.db';


@Injectable({
    providedIn: 'root'
})
export class SqlService {
    dbInstance: any;

    // constructor(public sqlite: SQLite, private platform: Platform) {
    //     this.init();
    // }

    // async init() {
    //     if (!this.platform.is('cordova')) {
    //         let db = window.openDatabase(SQL_DB_NAME, '1.0', 'DEV', 5 * 1024 * 1024);
    //         this.dbInstance = browserDBInstance(db);
    //     } else {
    //         this.dbInstance = await this.sqlite.create({
    //             name: SQL_DB_NAME,
    //             location: 'default'
    //         });
    //     }
    // }
}
