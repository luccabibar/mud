import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'opcoes-menu/ficha-paciente',
        loadChildren: './opcoes-menu/ficha-paciente/ficha-paciente.module#FichaPacientePageModule'
      },
      {
        path: 'opcoes-menu/grafico-crise',
        loadChildren: './opcoes-menu/grafico-crise/grafico-crise.module#GraficoCrisePageModule'
      },
      {
        path: 'opcoes-menu/grafico-semanal',
        loadChildren: './opcoes-menu/grafico-semanal/grafico-semanal.module#GraficoSemanalPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
