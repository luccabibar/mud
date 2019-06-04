import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var BancoService = /** @class */ (function () {
    function BancoService(http) {
        this.http = http;
        this.API_URL = 'http://200.145.153.172/mud/API/index.php/';
    }
    BancoService.prototype.insertGenerico = function (sql) {
        var data = {
            sql: sql,
        };
        var header = new HttpHeaders({ 'Content-type': 'application/json' });
        return this.http.post(this.API_URL + 'insertGenerico', data, { headers: header }).toPromise();
    };
    BancoService.prototype.selectGenerico = function (sql) {
        var data = {
            sql: sql,
        };
        var header = new HttpHeaders({ 'Content-type': 'application/json' });
        return this.http.post(this.API_URL + 'selectGenerico', data, { headers: header }).toPromise();
    };
    BancoService.prototype.deleteGenerico = function (sql) {
        var data = {
            sql: sql,
        };
        var header = new HttpHeaders({ 'Content-type': 'application/json' });
        return this.http.post(this.API_URL + 'deleteGenerico', data, { headers: header }).toPromise();
    };
    BancoService.prototype.updateGenerico = function (sql) {
        var data = {
            sql: sql,
        };
        var header = new HttpHeaders({ 'Content-type': 'application/json' });
        return this.http.post(this.API_URL + 'updateGenerico', data, { headers: header }).toPromise();
    };
    BancoService.prototype.mostraUsuarios = function () {
        var header = new HttpHeaders({ 'Content-type': 'application/json' });
        return this.http.post(this.API_URL + 'mostraUsuarios', { headers: header }).toPromise();
    };
    BancoService.prototype.cadProf = function (nome, cpf, email, data_nasc, celular, profissional, crp, senha) {
        var data = {
            nome: nome,
            cpf: cpf,
            email: email,
            data_nasc: data_nasc,
            celular: celular,
            profissional: profissional,
            crp: crp,
            senha: senha,
        };
        var header = new HttpHeaders({ 'Content-type': 'application/json' });
        return this.http.post(this.API_URL + 'cadProf', data, { headers: header }).toPromise();
    };
    BancoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], BancoService);
    return BancoService;
}());
export { BancoService };
//# sourceMappingURL=banco.service.js.map