import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
var DetalhesSemanalPage = /** @class */ (function () {
    function DetalhesSemanalPage(activatedRoute) {
        this.activatedRoute = activatedRoute;
        this.myId = null;
    }
    DetalhesSemanalPage.prototype.ngOnInit = function () {
        this.myId = this.activatedRoute.snapshot.paramMap.get('myId');
    };
    DetalhesSemanalPage = tslib_1.__decorate([
        Component({
            selector: 'app-detalhes-semanal',
            templateUrl: './detalhes-semanal.page.html',
            styleUrls: ['./detalhes-semanal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute])
    ], DetalhesSemanalPage);
    return DetalhesSemanalPage;
}());
export { DetalhesSemanalPage };
//# sourceMappingURL=detalhes-semanal.page.js.map