import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GraficoCrisePage } from './grafico-crise.page';
var routes = [
    {
        path: '',
        component: GraficoCrisePage
    }
];
var GraficoCrisePageModule = /** @class */ (function () {
    function GraficoCrisePageModule() {
    }
    GraficoCrisePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [GraficoCrisePage]
        })
    ], GraficoCrisePageModule);
    return GraficoCrisePageModule;
}());
export { GraficoCrisePageModule };
//# sourceMappingURL=grafico-crise.module.js.map