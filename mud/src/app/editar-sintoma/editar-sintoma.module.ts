import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditarSintomaPage } from './editar-sintoma.page';

const routes: Routes = [
  {
    path: '',
    component: EditarSintomaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditarSintomaPage]
})
export class EditarSintomaPageModule {}
