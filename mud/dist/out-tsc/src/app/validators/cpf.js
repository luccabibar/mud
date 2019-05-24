var CpfValidator = /** @class */ (function () {
    function CpfValidator() {
    }
    CpfValidator.checkCpf = function (control) {
        if (isNaN(control.value)) {
            return {
                "nao e um numero": true
            };
        }
        if (control.value < 9999999999) {
            return {
                "menor que um numero real": true
            };
        }
        if (control.value > 99999999999) {
            return {
                "maior que um numero real": true
            };
        }
        return null;
    };
    return CpfValidator;
}());
export { CpfValidator };
//# sourceMappingURL=cpf.js.map