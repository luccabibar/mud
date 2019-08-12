import { Component, OnInit } from '@angular/core';
import { BancoService } from './../banco.service';
import { DadosService } from '../dados.service';
import { NavController, IonSlides, AlertController, IonInput } from '@ionic/angular';
import { TmplAstBoundAttribute } from '@angular/compiler';


@Component({
  selector: 'app-mural',
  templateUrl: './mural.page.html',
  styleUrls: ['./mural.page.scss'],
})
export class MuralPage implements OnInit {

  public semanas;
  public user_sessao;


  information: any[] = [];


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
        message: JSON.stringify(response),
        buttons: ['OK']
      });

        let a=0;
        let colorControl=0;
        let corzita = "";
        do
        {
          switch(colorControl){
            case 0:
              corzita = "#FFE4E1";
              break;
            case 1:
                corzita = "#FFE4E1";
              break;
            case 2:
                corzita = "#FFE4E1";
              break;
            case 3:
                corzita = "#FFE4E1";
              colorControl = 0;
              break;
          }
          this.murais.push(response[a]);
          document.getElementsByTagName("ion-card")[a].style.background = corzita;
          a++;
          colorControl++;
        }while(response[a]!=null)
      
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