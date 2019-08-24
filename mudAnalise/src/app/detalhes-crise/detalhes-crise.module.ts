import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalhesCrisePage } from './detalhes-crise.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesCrisePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalhesCrisePage]
})
export class DetalhesCrisePageModule {}
