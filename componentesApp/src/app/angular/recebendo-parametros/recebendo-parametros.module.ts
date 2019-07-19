import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecebendoParametrosPage } from './recebendo-parametros.page';

const routes: Routes = [
  {
    path: '',
    component: RecebendoParametrosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecebendoParametrosPage]
})
export class RecebendoParametrosPageModule {}
