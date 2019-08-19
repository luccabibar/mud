import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalans',
  templateUrl: './modalans.page.html',
  styleUrls: ['./modalans.page.scss'],
})
export class ModalansPage implements OnInit {

  constructor(
    private modalCrtl: ModalController) { }

  ngOnInit() {
  }
  close(){
    this.modalCrtl.dismiss();
  }
}
