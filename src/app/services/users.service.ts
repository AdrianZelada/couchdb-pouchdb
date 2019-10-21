import { Injectable, NgZone } from '@angular/core';
import PouchDB from 'pouchdb';

import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';

// import { asObservable } from "rxjs/Observable";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    usersLDb: any;
    usersRDb: any;

    private users: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    public users$: Observable<any> = this.users.asObservable();
    constructor(public zone: NgZone) {
        this.usersLDb = new PouchDB('users');
        this.usersRDb = new PouchDB('http://127.0.0.1:5984/users');

        this.usersLDb.sync(this.usersRDb, { live: true }).on('complete', function () {
            console.log('complete');
            // yay, we're in sync!
        }).on('error', function (err) {
            console.log('complete error', err);
            // boo, we hit an error!
        });

        this.usersLDb.changes({
            since: 'now',
            live: true,
            include_docs: true
        }).on('change', (change) => {
            console.log('change');
            console.log(change);
            this.getAll();
            // received a change
        }).on('error', function (err) {
            console.log('change error');
            // handle errors
        });
    }

    create() {
        this.usersLDb.bulkDocs([
            {
                name: Date.now(),
                skills: 'JAVASCRIPTs'
            }]);
    }


    getAll() {
        // return fromPromise(this.usersLDb.allDocs({include_docs:true})).pipe(
        //   map((data:any) => {
        //       return data.rows || data;
        //   })
        // )
        this.zone.run(() => {
            this.usersLDb.allDocs({ include_docs: true }).then((data) => {
                console.log('GETALL===========++>', data);
                this.users.next(data.rows || data);
            });
        })

    }

    getUsers() {
        return this.usersLDb.allDocs({include_docs: true});
    }

}
