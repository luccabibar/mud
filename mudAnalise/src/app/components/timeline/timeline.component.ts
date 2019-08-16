import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {  Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {

  @Input('timeline') timeline: any;
  constructor(private toastCtrl:ToastController, public modalController: ModalController, public router:Router ) { }

  ngOnInit() {}

  async buyItem(timeline){
    let toast = await this.toastCtrl.create({
      message: "Added to the cart: ${timeline.name}"
    })
    toast.present();
  }
  
  async onClick(info,semanaId,icone){
    this.router.navigateByUrl('/detalhes-semanal/'+info+"-"+semanaId+"-"+icone);
  }

  /*
  async detalhesSemana() {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
  */




  

}
 