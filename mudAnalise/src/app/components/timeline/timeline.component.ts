// tinha um import { timeline } from 'console';

import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {

  @Input('product') product: any;
  constructor(private toastCtrl:ToastController ) { }

  ngOnInit() {}

  async buyItem(relatorio){
    let toast = await this.toastCtrl.create({
      message: `Added to the cart : ${relatorio.name}`
    })
    toast.present();
  }
}
