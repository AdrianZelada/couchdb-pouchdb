import {Injectable, NgZone} from '@angular/core';
import PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
PouchDB.plugin(cordovaSqlitePlugin);

// PouchDB.plugin(require('pouchdb-adapter-websql'));
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { environment as Enviroment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class UsersService {
    usersLDb: any ;
    usersRDb: any ;

    private users: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    public users$: Observable<any> = this.users.asObservable();

    appoitmentsLDb: any ;
    appoitmentsRDb: any ;

    private appoitments: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    public appoitments$: Observable<any> = this.appoitments.asObservable();


    constructor(public zone: NgZone, private http: HttpClient) {
        // this.usersLDb = new PouchDB('users');
        // this.usersRDb = new PouchDB('http://127.0.0.1:5984/users');
        //
        // this.usersLDb.sync(this.usersRDb, {live: true, doc_ids: ["a35b2924aa710e8263cda1b8330005c8"]}).on('complete', function () {
        //     console.log('complete');
        //     // yay, we're in sync!
        // }).on('error', function (err) {
        //     console.log('complete error');
        //     // boo, we hit an error!
        // });
        //
        // this.usersLDb.changes({
        //     since: 'now',
        //     live: true,
        //     include_docs: true
        // }).on('change',  (change) =>{
        //     console.log('change');
        //     console.log(change);
        //     this.getAll();
        //     // received a change
        // }).on('error', function (err) {
        //     console.log('change error');
        //     // handle errors
        // });

        // this.getMedicalAppoitments();
    }

    create() {
        this.usersLDb.bulkDocs([
            {
                name: Date.now()
            }])
    }

    getAll() {
        this.zone.run(() => {
            this.usersLDb.allDocs({include_docs: true}).then((data) => {
                this.users.next(data.rows || data);
            });
        })
    }

    getThmedicalAppoitments() {
        this.zone.run(() => {
            this.appoitmentsLDb.allDocs({include_docs: true}).then((data) => {
                console.log("data appoitments");
                console.log(data);
                this.appoitments.next(data.rows || data);
            });
        })
    }

    getMedicalAppoitments(){
        this.zone.run(() => {
           this.getSyncData().subscribe((data) => {
               console.log(data);
               this.getCouchDBMedicalAppoitment(data);
           }, (e) => {
               console.log(e);
           })
        });
    }

    getSyncData() {
        // return this.http.get(`http://localhost:3005/api/ThMedicalAppointments/syncData`);
        return this.http.get(`${Enviroment.apiUrl}/ThMedicalAppointments/syncData`);
    }

    getCouchDBMedicalAppoitment(data){
        
        this.appoitmentsLDb = new PouchDB('thmedicalappoitments.db', { adapter: 'cordova-sqlite'});
        this.appoitmentsRDb = new PouchDB(`${Enviroment.apiCouch}/thmedicalappoitments`);
        // debugger;
        this.appoitmentsRDb.sync(this.appoitmentsLDb, {live: true, doc_ids: data}).on('complete', function () {
            console.log('complete');
            // debugger;
            // yay, we're in sync!
        }).on('error', function (err) {
            console.log('complete error');
            // debugger;
            // boo, we hit an error!
        });

        this.appoitmentsLDb.changes({
            since: 'now',
            live: true,
            include_docs: true
        }).on('change',  (change) =>{
            console.log('change');
            console.log(change);
            this.getThmedicalAppoitments();
            // this.getAll();
            // received a change
        }).on('error', function (err) {
            console.log('change error');
            // handle errors
        });
    }
}
