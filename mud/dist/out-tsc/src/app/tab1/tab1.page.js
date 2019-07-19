import * as tslib_1 from "tslib";
import { IonInput } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
var Tab1Page = /** @class */ (function () {
    function Tab1Page() {
    }
    Tab1Page.prototype.aa = function () {
        var _this = this;
        setTimeout(function () {
            _this.ino.setFocus();
        }, 400);
    };
    tslib_1.__decorate([
        ViewChild('deus'),
        tslib_1.__metadata("design:type", IonInput)
    ], Tab1Page.prototype, "ino", void 0);
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map