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

  doRefresh(event) {
    this.addMural();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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
        let j=0;
        let y =0;
        let colorControl=0;
        let corzita = "";
        
        let n=0;
        do
        {
          this.murais.splice(0,n);
          n++;
        }while(response[n]!=null)

        do
        {
          this.murais.push(response[a]);
          a++;
        }while(response[a]!=null)

      do{  
            switch(j){
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
              j = 0;
              break;
            }
            
          document.getElementsByTagName("ion-card")[y].style.backgroundColor = corzita; 
          
          
          j++;
          y++;
        }while(this.murais[y]!= null)

      await alert.present();
      }
  ).catch(async(response)=>{

    const alert = await this.AlertController.create({
      header: 'ERRO ERRO',
      subHeader: 'aaaaaa',
      message: JSON.stringify(response),
      buttons: ['OK']
    });

    await alert.present()
  })
     
  }
}