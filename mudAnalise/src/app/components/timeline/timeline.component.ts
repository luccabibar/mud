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
  
  /**
   * 
   * @param info Informa qual detalhe vai ser exposto (alimentacao,lazer,sono,)
   * @param semanaId pega o id da semana escolhida
   * @param icone indica qual icon vai ser mostrado (alimentacao,lazer,sono...)
   */
  async onClick(info,semanaId,icone){
    this.router.navigateByUrl('/detalhes-semanal/'+info+"-"+semanaId+"-"+icone);
  }





  

}
 