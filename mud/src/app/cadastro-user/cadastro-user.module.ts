import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';

import { CadastroUserPage } from './cadastro-user.page';

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
    IonicModule,
    RouterModule.forChild(routes),
    BrMaskerModule
  ],
  declarations: [CadastroUserPage]
})
export class CadastroUserPageModule {}
