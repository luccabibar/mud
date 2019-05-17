import { promise } from 'protractor';
import { NavController, ToastController } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public form = [
    { val: 'Dificuldade para Respirar', id: 0 },
    { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
    { val: 'Sensações de Asfixia', isChecked: false },
    { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
    { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
    { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
    { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
    { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
    { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
    { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
    { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
    { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
    { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
    { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false }
  ];
 
}
