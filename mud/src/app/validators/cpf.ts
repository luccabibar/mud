import { FormControl } from '@angular/forms';

export class CpfValidator {
    static checkCpf(control: FormControl): any {

        return new Promise(resolve => {
    
          //Fake a slow response from server
    
          setTimeout(() => {
            if(control.value == 12345678910){
    
              resolve({
                "cpf taken": true
              });
    
            } else {
              resolve(null);
            }
          }, 2000);
    
        });
      }
}
