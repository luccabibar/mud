import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalhesSemanalPage } from './detalhes-semanal.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesSemanalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalhesSemanalPage]
})
export class DetalhesSemanalPageModule {}
