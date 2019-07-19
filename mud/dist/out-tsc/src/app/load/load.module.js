import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoadPage } from './load.page';
var routes = [
    {
        path: '',
        component: LoadPage
    }
];
var LoadPageModule = /** @class */ (function () {
    function LoadPageModule() {
    }
    LoadPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LoadPage]
        })
    ], LoadPageModule);
    return LoadPageModule;
}());
export { LoadPageModule };
//# sourceMappingURL=load.module.js.map