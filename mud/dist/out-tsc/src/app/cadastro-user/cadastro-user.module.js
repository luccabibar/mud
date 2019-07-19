import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CadastroUserPage } from './cadastro-user.page';
var routes = [
    {
        path: '',
        component: CadastroUserPage
    }
];
var CadastroUserPageModule = /** @class */ (function () {
    function CadastroUserPageModule() {
    }
    CadastroUserPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes),
            ],
            declarations: [CadastroUserPage]
        })
    ], CadastroUserPageModule);
    return CadastroUserPageModule;
}());
export { CadastroUserPageModule };
//# sourceMappingURL=cadastro-user.module.js.map