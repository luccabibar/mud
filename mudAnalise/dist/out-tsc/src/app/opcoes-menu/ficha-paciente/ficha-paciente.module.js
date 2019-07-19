import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FichaPacientePage } from './ficha-paciente.page';
var routes = [
    {
        path: '',
        component: FichaPacientePage
    }
];
var FichaPacientePageModule = /** @class */ (function () {
    function FichaPacientePageModule() {
    }
    FichaPacientePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [FichaPacientePage]
        })
    ], FichaPacientePageModule);
    return FichaPacientePageModule;
}());
export { FichaPacientePageModule };
//# sourceMappingURL=ficha-paciente.module.js.map