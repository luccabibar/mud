import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalansPage } from './modalans.page';
import { Tab3PageModule } from '../tab3/tab3.module';

const routes: Routes = [
  {
    path: '',
    component: ModalansPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalansPage],
  exports: [ModalansPage]
})
export class ModalansPageModule {}
