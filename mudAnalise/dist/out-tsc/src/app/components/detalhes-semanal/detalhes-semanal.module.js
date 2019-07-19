import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DetalhesSemanalPage } from './detalhes-semanal.page';
var routes = [
    {
        path: '',
        component: DetalhesSemanalPage
    }
];
var DetalhesSemanalPageModule = /** @class */ (function () {
    function DetalhesSemanalPageModule() {
    }
    DetalhesSemanalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [DetalhesSemanalPage]
        })
    ], DetalhesSemanalPageModule);
    return DetalhesSemanalPageModule;
}());
export { DetalhesSemanalPageModule };
//# sourceMappingURL=detalhes-semanal.module.js.map