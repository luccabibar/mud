import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Adicionado o modulo ReactiveFormsModule
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegistroFormPage } from './registro-form.page';

// Importação para utilização de mascaras no formulário
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: RegistroFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, // Adicionado o módulo ReactiveFormsModule
    IonicModule,
    RouterModule.forChild(routes),
    BrMaskerModule
  ],
  declarations: [RegistroFormPage]
})
export class RegistroFormPageModule { }
