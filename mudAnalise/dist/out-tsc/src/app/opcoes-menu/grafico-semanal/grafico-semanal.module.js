import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GraficoSemanalPage } from './grafico-semanal.page';
var routes = [
    {
        path: '',
        component: GraficoSemanalPage
    }
];
var GraficoSemanalPageModule = /** @class */ (function () {
    function GraficoSemanalPageModule() {
    }
    GraficoSemanalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [GraficoSemanalPage]
        })
    ], GraficoSemanalPageModule);
    return GraficoSemanalPageModule;
}());
export { GraficoSemanalPageModule };
//# sourceMappingURL=grafico-semanal.module.js.map