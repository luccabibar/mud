import { Component, OnInit } from '@angular/core';
import { BancoService } from './../banco.service';
import { DadosService } from '../dados.service';
import { NavController, IonSlides, AlertController, IonInput } from '@ionic/angular';


@Component({
  selector: 'app-mural',
  templateUrl: './mural.page.html',
  styleUrls: ['./mural.page.scss'],
})
export class MuralPage implements OnInit {

  public murais = [
  ];


  constructor(private dadosService: DadosService, private BancoService: BancoService,private AlertController: AlertController)
   { }



  ngOnInit() {
    this.addMural();
  }

  public addMural()
  {
    let id=this.dadosService.getId();
    this.BancoService.selecionarMural(id).then(async(response)=>{
      const alert = await this.AlertController.create({
        header: 'Confirmação',
        subHeader: 'Sucesso!',
        message: JSON.stringify(response[0].id_usuario),
        buttons: ['OK']
      });
      
      this.murais.push(response[0]);

      await alert.present();
    }
  )
  .catch(async(response)=>{

    const alert = await this.AlertController.create({
      header: 'Confirmação',
      subHeader: 'Erro!',
      message: JSON.stringify(response),
      buttons: ['OK']
    });

    await alert.present()
  })
     
  }
}