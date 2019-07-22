import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'grafico-semanal', loadChildren: './opcoes-menu/grafico-semanal/grafico-semanal.module#GraficoSemanalPageModule' },
  { path: 'grafico-crise', loadChildren: './opcoes-menu/grafico-crise/grafico-crise.module#GraficoCrisePageModule' },
  { path: 'ficha-paciente', loadChildren: './opcoes-menu/ficha-paciente/ficha-paciente.module#FichaPacientePageModule' },
  { path: 'detalhes-semanal/:myId', loadChildren: './components/detalhes-semanal/detalhes-semanal.module#DetalhesSemanalPageModule' },  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'esqueci', loadChildren: './esqueci/esqueci.module#EsqueciPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
