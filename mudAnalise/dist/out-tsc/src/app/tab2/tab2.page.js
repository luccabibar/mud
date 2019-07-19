import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var Tab2Page = /** @class */ (function () {
    function Tab2Page(http) {
        var _this = this;
        this.http = http;
        this.http.get('assets/information.json').subscribe(function (res) {
            _this.information = res['items'];
            _this.information[0].open = true;
        });
    }
    Tab2Page.prototype.toggleSection = function (index) {
        this.information[index].open = !this.information[index].open;
        // se tirar  o "!", deixa abrir varias consultas ao msm tempo 
        if (this.automaticClose && this.information[index].open) {
            this.information
                .filter(function (item, itemIndex) { return itemIndex != index; })
                .map(function (item) { return item.open = false; });
        }
    };
    Tab2Page.prototype.toggleItem = function (index, childIndex) {
        this.information[index].children[childIndex].open = !this.information[index].children[childIndex].open;
    };
    Tab2Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map