import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimelineComponent } from './timeline/timeline.component';
var SharedComponentsModule = /** @class */ (function () {
    function SharedComponentsModule() {
    }
    SharedComponentsModule = tslib_1.__decorate([
        NgModule({
            declarations: [TimelineComponent],
            imports: [
                CommonModule,
                IonicModule
            ],
            exports: [TimelineComponent]
        })
    ], SharedComponentsModule);
    return SharedComponentsModule;
}());
export { SharedComponentsModule };
//# sourceMappingURL=shared-components.module.js.map