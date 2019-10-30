import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class ThbeneficiaryService {
  beneficiaryLDb: any ;
  beneficiaryRDb: any ;

  private beneficiary: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public beneficiary$: Observable<any> = this.beneficiary.asObservable();

  constructor(private http: HttpClient, public zone: NgZone) { }

  getListDataToSync() {
    return this.http.get('http://localhost:3105/api/Tp35Beneficiaries/syncData');
  }

  syncDataDb(oldIds, ids, online = true) {
    this.beneficiaryLDb = new PouchDB('tp35_beneficiary');
    this.beneficiaryRDb = new PouchDB('http://127.0.0.1:5984/tp35_beneficiary');

    if (online) {
      this.replicateDB(oldIds).then(() => {
        this.beneficiaryLDb.destroy((e, respo) => {
          if(e) {
            console.log('error');
            console.log(e);
          } else {
            console.log('this.beneficiaryLDb', respo);
            localStorage.setItem('medical', JSON.stringify(ids));
            this.beneficiaryLDb = new PouchDB('tp35_beneficiary');
            this.beneficiaryLDb.sync(this.beneficiaryRDb, {
              live:true,
              retry:true,
              doc_ids: ids
            }).on('change', (change) => {
              console.log('change');

              this.getDataDb();
            }).on('complete', () =>{
              console.log('complete');
              this.getDataDb();
            }).on('error', () => {
              console.log('error error error');
            });

            this.getDataDb();
          }
        })


      }).catch((e) => {
        console.log('eeeeeeee');
        console.log(e);
      });
    } else {
      this.beneficiaryLDb.sync(this.beneficiaryRDb, {
        live:true,
        retry:true,
        doc_ids: oldIds
      }).on('change', (change) => {
        console.log('change');

        this.getDataDb();
      }).on('complete', () =>{
        console.log('complete');
        this.getDataDb();
      }).on('error', () => {
        console.log('error error error');
      });
      this.getDataDb();

    }

    // this.beneficiaryLDb.sync(this.beneficiaryRDb, {
    //   live:true,
    //   retry:true,
    //   doc_ids: ids
    // }).on('change', (change) => {
    //     console.log('change');
    //
    //     this.getDataDb();
    // }).on('complete', () =>{
    //   console.log('complete');
    //   this.getDataDb();
    // }).on('error', () => {
    // });
  }

  replicateDB(ids) {
    return new Promise((resolve, reject) => {
      const repli = this.beneficiaryLDb.replicate
          .to(this.beneficiaryRDb, {doc_ids: ids})
          .on('complete', () =>{
            console.log('complete');
            repli.cancel();
            resolve();
          }).on('error', () => {
            console.log('error');
            reject();
          });
    })

  }

  getDataDb() {
    this.zone.run(() => {
      this.beneficiaryLDb.allDocs({include_docs: true}).then((data) => {
        this.beneficiary.next(data.rows || data);
      });
    })
  }

  getAll() {
    this.getListDataToSync().subscribe((data: any) => {
      // if( data.length > 0) {
      //     localStorage.setItem('medical', JSON.stringify(data));
      // }
      const oldIds = this.getItem('medical');

      this.syncDataDb(oldIds, data);
      // this.removeInDevice(data).then(() => {
      //     this.getDataDb();
      //     localStorage.setItem('medical', JSON.stringify(data));
      // }).catch( e => console.log(e));
    }, (e)=>{
      console.log(e)
      const ids = JSON.parse(localStorage.getItem('medical'));
      this.syncDataDb(ids, [], false);
      // this.getDataDb();
    });
  }

  update(data){
      console.log(data);
      return this.beneficiaryLDb.put(data);
  }

  removeInDevice(newIds: Array<any>){
    console.log('newIds');
    console.log(newIds);
    const ids = this.getItem('medical');
    const diffIds = this.diffData(ids, newIds);
    console.log('ids');
    console.log(ids);
    console.log('diffIds');
    console.log(diffIds);
    const promiseDiff = diffIds.map((id) => {
      return new Promise((resolve, reject) => {
        this.beneficiaryLDb.get(id, (err, doc) => {
          if (err) { return reject(err); }
          // doc._deleted = true;
          this.beneficiaryLDb.remove(doc._id, doc._rev, (error, response) => {
            if (error) { return reject(error); }
            // handle response
            resolve(response);
          });
          // this.beneficiaryLDb.put(doc, (error, response) => {
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
