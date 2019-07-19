import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
var TimelineComponent = /** @class */ (function () {
    function TimelineComponent(toastCtrl, modalController, router) {
        this.toastCtrl = toastCtrl;
        this.modalController = modalController;
        this.router = router;
    }
    TimelineComponent.prototype.ngOnInit = function () { };
    TimelineComponent.prototype.buyItem = function (timeline) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: "Added to the cart: ${timeline.name}"
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    TimelineComponent.prototype.onClick = function (info) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.router.navigateByUrl('/detalhes-semanal/' + info);
                return [2 /*return*/];
            });
        });
    };
    tslib_1.__decorate([
        Input('timeline'),
        tslib_1.__metadata("design:type", Object)
    ], TimelineComponent.prototype, "timeline", void 0);
    TimelineComponent = tslib_1.__decorate([
        Component({
            selector: 'app-timeline',
            templateUrl: './timeline.component.html',
            styleUrls: ['./timeline.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ToastController, ModalController, Router])
    ], TimelineComponent);
    return TimelineComponent;
}());
export { TimelineComponent };
//# sourceMappingURL=timeline.component.js.map