import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GraficoSemanalPage } from './grafico-semanal.page';

const routes: Routes = [
  {
    path: '',
    component: GraficoSemanalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GraficoSemanalPage]
})
export class GraficoSemanalPageModule {}
