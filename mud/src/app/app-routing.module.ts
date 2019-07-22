import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
  { path: 'perfil-user', loadChildren: './perfil-user/perfil-user.module#PerfilUserPageModule' },
  { path: 'login-page', loadChildren: './login-page/login-page.module#LoginPagePageModule' },
  { path: '', loadChildren: './login-page/login-page.module#LoginPagePageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'load', loadChildren: './load/load.module#LoadPageModule' },
  { path: 'cadastro', loadChildren: './cadastro-user/cadastro-user.module#CadastroUserPageModule' },
  { path: 'relatorio-semanal', loadChildren: './relatorio-semanal/relatorio-semanal.module#RelatorioSemanalPageModule' },
  { path: 'relatorio-crise', loadChildren: './relatorio-crise/relatorio-crise.module#RelatorioCrisePageModule' },  { path: 'mural', loadChildren: './mural/mural.module#MuralPageModule' },

  
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
