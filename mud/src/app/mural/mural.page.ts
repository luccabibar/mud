import { Component, OnInit } from '@angular/core';
import { BancoService } from './../banco.service';
import { DadosService } from '../dados.service';
import { NavController, IonSlides, AlertController, IonInput } from '@ionic/angular';
import { TmplAstBoundAttribute } from '@angular/compiler';
import { Router } from '@angular/router';



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


  constructor(private navCtrl: NavController,private dadosService: DadosService, private BancoService: BancoService,private AlertController: AlertController)
   { }



  ngOnInit() {
    this.addMural();
  }

  doRefresh(event) {
    this.addMural();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  Info()
  {
    this.navCtrl.navigateForward('tab3');
  }

  public addMural()
  { 
    var dato ="";
    let id=this.dadosService.getId();
    this.BancoService.selecionarMural(id).then(async(response)=>{
      const alert = await this.AlertController.create({
        header: 'Confirmação',
        subHeader: 'Sucesso!',
        //message: JSON.stringify(response),
        buttons: ['OK']
      });

        let a=0;
        let j=0;
        let y =0;
        let corzita = "";
        
        
        let n=0;
        do
        {
          this.murais.splice(0,n+1);
          n++;
        }while(response[n]!=null)


        do
        { 
          dato = response[a]['created_at'];
          dato = dato.substr(8,2) + "/" + dato.substr(5,2) + "/" + dato.substr(0,4);
          this.murais.push(response[a]);
          this.murais[a].created_at = dato;
          a++;
          dato= "";
        }while(response[a]!=null)

      do{  
            switch(j){
            case 0:
              corzita = "#FFCCBC";
              break;
            case 1:
                corzita = "#FFF9C4";
              break;
            case 2:
                corzita = "#DCEDC8";
              break;
            case 3:
                corzita = "#B3E5FC";
              j = -1;
              break;
            }

          await alert.present();  
          document.getElementsByTagName("ion-card")[y].style.backgroundColor = corzita; 
          j++;
          y++;
          }while(this.murais[y]!= null)

         
      }
  ).catch(async(response)=>{

    const alert = await this.AlertController.create({
      header: 'Mural Vazio',
      //subHeader: 'aaaaaa' + dato,
      message: "Você ainda não está conectado a um profissional.",
      buttons: ['OK']
    });

    await alert.present()
  })
     
  }
}