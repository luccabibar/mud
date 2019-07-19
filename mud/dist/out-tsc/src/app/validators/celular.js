var CelularValidator = /** @class */ (function () {
    function CelularValidator() {
    }
    CelularValidator.checkCelular = function (control) {
        if (isNaN(control.value)) {
            return {
                "naoenum": true
            };
        }
        if (control.value < 9999999999) {
            return {
                "menor": true
            };
        }
        if (control.value > 99999999999) {
            return {
                "maior": true
            };
        }
        if (control.value == null) {
            return {
                "sei la": false
            };
        }
        return null;
    };
    return CelularValidator;
}());
export { CelularValidator };
//# sourceMappingURL=celular.js.map