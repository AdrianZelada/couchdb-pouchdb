import {Injectable, NgZone} from '@angular/core';
import PouchDB from 'pouchdb';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    usersLDb: any ;
    usersRDb: any ;

    private users: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    public users$: Observable<any> = this.users.asObservable();
    constructor(public zone: NgZone) {
        this.usersLDb = new PouchDB('users');
        this.usersRDb = new PouchDB('http://127.0.0.1:5984/users');

        this.usersLDb.sync(this.usersRDb, {live: true, doc_ids: ["a35b2924aa710e8263cda1b8330005c8"]}).on('complete', function () {
            console.log('complete');
            // yay, we're in sync!
        }).on('error', function (err) {
            console.log('complete error');
            // boo, we hit an error!
        });

        this.usersLDb.changes({
            since: 'now',
            live: true,
            include_docs: true
        }).on('change',  (change) =>{
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
                name: Date.now()
            }])
    }


    getAll() {
        // return fromPromise(this.usersLDb.allDocs({include_docs:true})).pipe(
        //   map((data:any) => {
        //       return data.rows || data;
        //   })
        // )
        this.zone.run(() => {
            this.usersLDb.allDocs({include_docs: true}).then((data) => {
                this.users.next(data.rows || data);
            });
        })

    }

}
