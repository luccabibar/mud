import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PerfilUserPage } from './perfil-user.page';

import { BrMaskerModule } from 'br-mask'
 
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrMaskerModule,
    RouterModule.forChild([{ path: '', component: PerfilUserPage }])
  ],
  declarations: [PerfilUserPage]
})
export class PerfilUserPageModule {}
