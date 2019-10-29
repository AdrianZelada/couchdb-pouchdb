import {BehaviorSubject, Observable} from "rxjs";
// import PouchDB from "pouchdb";
// import {HttpClient} from "@angular/common/http";
// import {NgZone} from "@angular/core";

export class ParentSync {
    dbLocal: any;
    dbRemote: any;

    nameDbLocal: string = '';
    nameDbRemote: string = '';
    directionApi: string = '';

    private pool: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    public pool$: Observable<any> = this.pool.asObservable();

    // constructor(
    //     connection: any,
    //     private http: HttpClient,
    //     private zone: NgZone){
    //     // this.nameDbLocal = connectionLocal;
    //     // this.nameDbRemote = connexionRemote;
    //     // this.directionApi = directionApi;
    //
    //     // connexionLocal: string, connexionRemote: string, directionApi: string,
    // }
    //
    // getListDataToSync(){
    //     return this.http.get('http://localhost:3005/api/ThMedicalAppointments/syncData');
    // }


    // syncDataDb(oldIds, ids, online = true) {
    //     this.dbLocal = new PouchDB(this.nameDbLocal);
    //     this.dbRemote = new PouchDB(this.nameDbRemote);
    //     if (online) {
    //         this.replicateDB(oldIds).then(() => {
    //             this.dbLocal.destroy((e, respo) => {
    //                 if(e) {
    //                     console.log('error');
    //                     console.log(e);
    //                 } else {
    //                     console.log('this.appoitmentsLDb', respo);
    //                     localStorage.setItem('medical', JSON.stringify(ids));
    //                     this.dbLocal = new PouchDB('th_medical_appointment');
    //                     this.dbLocal.sync(this.dbRemote, {
    //                         live:true,
    //                         retry:true,
    //                         doc_ids: ids
    //                     }).on('change', (change) => {
    //                         console.log('change');
    //
    //                         this.getDataDb();
    //                     }).on('complete', () =>{
    //                         console.log('complete');
    //                         this.getDataDb();
    //                     }).on('error', () => {
    //                         console.log('error error error');
    //                     });
    //
    //                     this.getDataDb();
    //                 }
    //             })
    //
    //
    //         }).catch((e) => {
    //             console.log('eeeeeeee');
    //             console.log(e);
    //         });
    //     } else {
    //         this.dbLocal.sync(this.dbRemote, {
    //             live:true,
    //             retry:true,
    //             doc_ids: oldIds
    //         }).on('change', (change) => {
    //             console.log('change');
    //
    //             this.getDataDb();
    //         }).on('complete', () =>{
    //             console.log('complete');
    //             this.getDataDb();
    //         }).on('error', () => {
    //             console.log('error error error');
    //         });
    //         this.getDataDb();
    //
    //     }
    //
    // }
    //
    //
    // replicateDB(ids) {
    //     return new Promise((resolve, reject) => {
    //         const repli = this.dbLocal.replicate
    //             .to(this.dbRemote, {doc_ids: ids})
    //             .on('complete', () =>{
    //                 console.log('complete');
    //                 repli.cancel();
    //                 resolve();
    //             }).on('error', () => {
    //                 console.log('error');
    //                 reject();
    //             });
    //     })
    //
    // }
    //
    // getDataDb() {
    //     this.zone.run(() => {
    //         this.dbLocal.allDocs({include_docs: true}).then((data) => {
    //             this.pool.next(data.rows || data);
    //         });
    //     })
    // }


    // getAll() {
    //     this.getListDataToSync().subscribe((data: any) => {
    //         // if( data.length > 0) {
    //         //     localStorage.setItem('medical', JSON.stringify(data));
    //         // }
    //         // const oldIds = this.getItem('medical');
    //
    //         this.syncDataDb(oldIds, data);
    //         // this.removeInDevice(data).then(() => {
    //         //     this.getDataDb();
    //         //     localStorage.setItem('medical', JSON.stringify(data));
    //         // }).catch( e => console.log(e));
    //     }, (e)=>{
    //         console.log(e)
    //         const ids = JSON.parse(localStorage.getItem('medical'));
    //         this.syncDataDb(ids, [], false);
    //         // this.getDataDb();
    //     });
    // }
}
