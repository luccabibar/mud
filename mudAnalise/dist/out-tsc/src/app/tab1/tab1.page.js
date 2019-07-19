import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(callNumber, router) {
        this.callNumber = callNumber;
        this.router = router;
    }
    Tab1Page.prototype.callNow = function (number) {
        this.callNumber.callNumber(number, true)
            .then(function (res) { return console.log('Launched dialer!', res); })
            .catch(function (err) { return console.log('Error launching dialer', err); });
    };
    Tab1Page.prototype.abrirAbas = function () {
        this.router.navigateByUrl('/opcoes-menu/ficha-usuario');
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [CallNumber,
            Router])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map