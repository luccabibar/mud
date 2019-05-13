import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {

  @Input('timeline') timeline: any;
  constructor(private toastCtrl:ToastController ) { }

  ngOnInit() {}

  async buyItem(timeline){
    let toast = await this.toastCtrl.create({
      message: "Added to the cart: ${timeline.name}"
    })
    toast.present();
  }
}
 