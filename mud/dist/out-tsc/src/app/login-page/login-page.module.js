import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPagePage } from './login-page.page';
var routes = [
    {
        path: '',
        component: LoginPagePage
    }
];
var LoginPagePageModule = /** @class */ (function () {
    function LoginPagePageModule() {
    }
    LoginPagePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LoginPagePage]
        })
    ], LoginPagePageModule);
    return LoginPagePageModule;
}());
export { LoginPagePageModule };
//# sourceMappingURL=login-page.module.js.map