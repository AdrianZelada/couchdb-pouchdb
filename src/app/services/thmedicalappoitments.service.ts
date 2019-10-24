import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import PouchDB from "pouchdb";
import {switchMap} from "rxjs/operators";

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
    console.log(ids)
    this.appoitmentsLDb = new PouchDB('th_medical_appointment');
    this.appoitmentsRDb = new PouchDB('http://127.0.0.1:5984/th_medical_appointment');
    this.appoitmentsLDb.sync(this.appoitmentsRDb, {
      live:true,
      retry:true,
      doc_ids: ids
    }).on('change', (change) => {
        console.log('change');
        console.log(change);
        this.getDataDb();
    }).on('complete', () =>{
      console.log('complete');
      this.getDataDb();
    }).on('error', () => {
      console.log('error');
    });
  }
  getDataDb() {
    this.zone.run(() => {
      this.appoitmentsLDb.allDocs({include_docs: true}).then((data) => {
        console.log("data xxxx ");
        console.log(data);
        this.appoitments.next(data.rows || data);
      });
    })
  }

  getAll() {
    this.getListDataToSync().subscribe((data: any) => {
      console.log('this.getListDataToSync');
      if( data.length > 0) {
          localStorage.setItem('medical', JSON.stringify(data));
      }
      this.syncDataDb(data);
      this.getDataDb();
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




}
