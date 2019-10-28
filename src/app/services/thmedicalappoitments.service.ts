import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import PouchDB from "pouchdb";

@Injectable({
  providedIn: 'root'
})
export class ThmedicalappoitmentsService {
  appoitmentsLDb: any ;
  appoitmentsRDb: any ;

  private appoitments: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public appoitments$: Observable<any> = this.appoitments.asObservable();

  constructor(private http: HttpClient, public zone: NgZone) { }

  getListDataToSync(){
    return this.http.get('http://localhost:3005/api/ThMedicalAppointments/syncData');
  }

  syncDataDb(ids) {
    this.appoitmentsLDb = new PouchDB('th_medical_appointment');
    this.appoitmentsRDb = new PouchDB('http://127.0.0.1:5984/th_medical_appointment');
    this.appoitmentsLDb.sync(this.appoitmentsRDb, {
      live:true,
      retry:true,
      doc_ids: ids
    }).on('change', (change) => {
        this.getDataDb();
    }).on('complete', () =>{
      this.getDataDb();
    }).on('error', () => {
    });
  }
  getDataDb() {
    this.zone.run(() => {
      this.appoitmentsLDb.allDocs({include_docs: true}).then((data) => {
        this.appoitments.next(data.rows || data);
      });
    })
  }

  getAll() {
    this.getListDataToSync().subscribe((data: any) => {
      // if( data.length > 0) {
      //     localStorage.setItem('medical', JSON.stringify(data));
      // }
      this.syncDataDb(data);
      this.removeInDevice(data).then(() => {
          this.getDataDb();
          localStorage.setItem('medical', JSON.stringify(data));
      });
    }, (e)=>{
      console.log(e)
      const ids = JSON.parse(localStorage.getItem('medical'));
      this.syncDataDb(ids);
      this.getDataDb();
    });
  }

  update(data){
      return this.appoitmentsLDb.put(data);
  }

  removeInDevice(newIds: Array<any>){
    const ids = this.getItem('medical');
    const diffIds = this.diffData(ids, newIds);
    const promiseDiff = diffIds.map((id) => {
        return new Promise((resolve, reject) => {
            this.appoitmentsLDb.get(id, (err, doc) => {
                if (err) { return reject(err); }
                // doc._deleted = true;
                this.appoitmentsLDb.remove(doc._id, doc._rev, (error, response) => {
                    if (error) { return reject(error); }
                    // handle response
                    resolve(response);
                });
                // this.appoitmentsLDb.put(doc, (error, response) => {
                //   if (error) { return reject(error); }
                //   resolve(response);
                // });
            });
        });
    });

    return Promise.all(promiseDiff);
    //   .then((resp: Array<any>) => {
    //   console.log(resp);
    // }).catch((e) => console.log(e));
  }

  private diffData(ids: Array<any>, newIds: Array<any>) {
    const diffIds = [];
    ids.forEach((id) => {
      if (newIds.indexOf(id) === -1) {
        diffIds.push(id);
      }
    });
    return diffIds;
  }

  private getItem(key) {
    const poll = localStorage.getItem(key);
    if  ( poll ) {
      return JSON.parse(poll);
    } else {
      return [];
    }
  }



}
