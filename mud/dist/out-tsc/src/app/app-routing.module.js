import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
    { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
    { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },
    { path: 'load', loadChildren: './load/load.module#LoadPageModule' },
    { path: '', loadChildren: './cadastro-user/cadastro-user.module#CadastroUserPageModule' },
    { path: 'login', loadChildren: './login-page/login-page.module#LoginPagePageModule' }
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