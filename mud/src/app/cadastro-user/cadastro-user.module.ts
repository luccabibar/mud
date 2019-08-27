import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUserPage } from './cadastro-user.page';

import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: CadastroUserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BrMaskerModule
  ],
  declarations: [CadastroUserPage]
})
export class CadastroUserPageModule {}
