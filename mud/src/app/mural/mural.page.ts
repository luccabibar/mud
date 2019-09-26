import { Component, OnInit } from '@angular/core';
import { BancoService } from './../banco.service';
import { DadosService } from '../dados.service';
import { NavController, IonSlides, AlertController, IonInput, LoadingController } from '@ionic/angular';
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


  constructor(private navCtrl: NavController,private dadosService: DadosService, private BancoService: BancoService,private AlertController: AlertController, private loadingCtrl: LoadingController)
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
        //const alert = await this.AlertController.create({
        //  header: 'Abrindo mural',
        //  subHeader: 'Aguarde o carregamento...'
        //});
        let loading = await this.loadingCtrl.create({
          //message: 'Processando...'
        });
        let a=0;
        let n=0;
        let j=0;
        let y=0;
        let corzita = "";
        
  
        do
        {
          this.murais.splice(0,n+1);
          n++;
        }while(response[n]!=null);
  
  
        do
        {
          dato = response[a]['created_at'];
          dato = dato.substr(8,2) + "/" + dato.substr(5,2) + "/" + dato.substr(0,4);
          this.murais.push(response[a]);
          this.murais[a].created_at = dato;
          a++;
          dato ="";
        }while(response[a]!=null);
  
       
        do{  
            switch(j){
            case 0:
              corzita = "rgba(95, 211, 188, 1)";//"#FFCCBC"; 'rgba(255, 255, 255,'+opacidade+')'
              break;
            case 1:
              corzita = "rgba(41, 148, 127, 1)";//"#DCEDC8";
            break;
            case 2:
                corzita = "rgba(48, 176, 151, 1)";//"#DCEDC8";
              break;
            case 3:
                corzita = "rgba(183, 235, 225, 1)"//"#B3E5FC"; 
              j = -1;
              break;
            }
            
          await loading.present();
          document.getElementsByName("ion-card-header")[y].style.backgroundColor = corzita;
          j++;
          y++;
          
        }while(this.murais[y]!= null)
        loading.dismiss();
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