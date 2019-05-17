import { FormControl } from '@angular/forms';

export class CelularValidator {
    static checkCelular(control: FormControl): any {

        if(isNaN(control.value)){
            return {
                "naoenum": true
            };
        }
         
        if(control.value < 9999999999){
            return {
                "menor": true
            };
        }

        if(control.value > 99999999999){
            return {
                "maior": true
            };
        }

        return null;
    }
}
