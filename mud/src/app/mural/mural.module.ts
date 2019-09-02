import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

import { MuralPage } from './mural.page';

const routes: Routes = [
  {
    path: '',
    component: MuralPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MuralPage]
})
export class MuralPageModule {}
