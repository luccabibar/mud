import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, IonInput } from '@ionic/angular';
import { BancoService } from './../banco.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
var LoginPagePage = /** @class */ (function () {
    function LoginPagePage(nav, formBuilder, BancoService, alertController) {
        this.nav = nav;
        this.formBuilder = formBuilder;
        this.BancoService = BancoService;
        this.alertController = alertController;
        this.submitAttempt = false;
        this.loginForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'senha': new FormControl(null, [Validators.required, Validators.minLength(2)])
        });
    }
    LoginPagePage.prototype.login = function () {
        var _this = this;
        var email = document.getElementById("1").value;
        var senha = document.getElementById("2").value;
        this.BancoService.selectGenerico("SELECT * FROM usuario WHERE email='" + email + "';")
            .then(function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var alert_1, alert_2;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(response[0].senha == senha)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Confirmação',
                                subHeader: 'Sucesso!',
                                message: JSON.stringify(response),
                                buttons: ['OK']
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        this.nav.navigateForward('tab1');
                        return [2 /*return*/];
                    case 3:
                        if (!(response[0].senha != senha)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Confirmação',
                                subHeader: 'Sucesso!',
                                message: 'A senha está incorreta',
                                buttons: ['OK']
                            })];
                    case 4:
                        alert_2 = _a.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 5:
                        _a.sent();
                        setTimeout(function () {
                            _this.ino.setFocus();
                        }, 400);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); })
            .catch(function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirmação',
                            subHeader: 'Erro!',
                            message: 'A conta não existe',
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    LoginPagePage.prototype.direcCadast = function () {
        this.nav.navigateForward('cadastro');
    };
    tslib_1.__decorate([
        ViewChild('deus'),
        tslib_1.__metadata("design:type", IonInput)
    ], LoginPagePage.prototype, "ino", void 0);
    LoginPagePage = tslib_1.__decorate([
        Component({
            selector: 'app-login-page',
            templateUrl: './login-page.page.html',
            styleUrls: ['./login-page.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, FormBuilder, BancoService, AlertController])
    ], LoginPagePage);
    return LoginPagePage;
}());
export { LoginPagePage };
//# sourceMappingURL=login-page.page.js.map