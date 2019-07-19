import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Adicionado o modulo ReactiveFormsModule
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormsPage } from './forms.page';

const routes: Routes = [
  {
    path: '',
    component: FormsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, // Adicionado o módulo ReactiveFormsModule
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormsPage]
})
export class FormsPageModule { }
