import { Component, OnInit } from '@angular/core';
import {ThmedicalappoitmentsService} from "../services/thmedicalappoitments.service";
import {map} from "rxjs/operators";
import {ThbeneficiaryService} from "./thbeneficiary.service";
import {ModalController} from "@ionic/angular";
import {ViewDataComponent} from "./view-data/view-data.component";

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.page.html',
  styleUrls: ['./beneficiary.page.scss'],
})
export class BeneficiaryPage implements OnInit {

  list: Array<any> = [];
  constructor(
      private thbeneficiaryService: ThbeneficiaryService,
      public modalController: ModalController
      ) {}

  ngOnInit() {
    this.thbeneficiaryService.beneficiary$
        .pipe(
            map((response: Array<any>) => {
              return response.map((obj) => {
                return obj.doc
              });
            })
        )
        .subscribe((res: Array<any>) =>{
            console.log(res);
            this.list = res;
        });
  }

  async update(item: any) {
      console.log(item);
    const modal = await this.modalController.create({
      component: ViewDataComponent,
      componentProps: {
          data: {...item}
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
        console.log(data);
        this.thbeneficiaryService.update(data).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        });
    }
    // this.thbeneficiaryService.update(item).then((res) => {
    //   console.log(res);
    // });
  }
}
