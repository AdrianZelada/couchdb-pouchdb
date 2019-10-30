import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BeneficiaryPage } from './beneficiary.page';
import {ListDataComponent} from './list-data/list-data.component';
import {ViewDataComponent} from './view-data/view-data.component';

const routes: Routes = [
  {
    path: '',
    component: BeneficiaryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BeneficiaryPage, ListDataComponent, ViewDataComponent],
  entryComponents: [ViewDataComponent]
})
export class BeneficiaryPageModule {}
