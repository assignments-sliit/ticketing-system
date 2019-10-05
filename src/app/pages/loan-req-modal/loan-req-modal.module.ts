import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoanReqModalPage } from './loan-req-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LoanReqModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoanReqModalPage]
})
export class LoanReqModalPageModule {}
