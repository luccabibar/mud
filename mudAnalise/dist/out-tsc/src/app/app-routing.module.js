import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', loadChildren: './login/login.module#LoginPageModule' },
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
    { path: 'grafico-semanal', loadChildren: './opcoes-menu/grafico-semanal/grafico-semanal.module#GraficoSemanalPageModule' },
    { path: 'grafico-crise', loadChildren: './opcoes-menu/grafico-crise/grafico-crise.module#GraficoCrisePageModule' },
    { path: 'ficha-paciente', loadChildren: './opcoes-menu/ficha-paciente/ficha-paciente.module#FichaPacientePageModule' },
    { path: 'detalhes-semanal/:myId', loadChildren: './components/detalhes-semanal/detalhes-semanal.module#DetalhesSemanalPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map