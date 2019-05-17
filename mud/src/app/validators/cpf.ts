import { FormControl } from '@angular/forms';

export class CpfValidator {
    static checkCpf(control: FormControl): any {
      
      if(isNaN(control.value)){
          return {
              "nao e um numero": true
          };
      }
      
      if(control.value < 9999999999){
          return {
              "menor que um numero real": true
          };
      }

      if(control.value > 99999999999){
          return {
              "maior que um numero real": true
          };
      }

      return null;
      }
}
