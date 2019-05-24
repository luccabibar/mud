import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'grafico-semanal', loadChildren: './opcoes-menu/grafico-semanal/grafico-semanal.module#GraficoSemanalPageModule' },
  { path: 'grafico-crise', loadChildren: './opcoes-menu/grafico-crise/grafico-crise.module#GraficoCrisePageModule' },
  { path: 'ficha-paciente', loadChildren: './opcoes-menu/ficha-paciente/ficha-paciente.module#FichaPacientePageModule' },
  { path: 'second/:myId', loadChildren: './components/second/second.module#SecondPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
