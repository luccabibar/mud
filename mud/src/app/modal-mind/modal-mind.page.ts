import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-mind',
  templateUrl: './modal-mind.page.html',
  styleUrls: ['./modal-mind.page.scss'],
})
export class ModalMindPage implements OnInit {

  constructor(private modalCrtl: ModalController) { }

  ngOnInit() {
  }
  close1(){
    this.modalCrtl.dismiss();
  }
}
