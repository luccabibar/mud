import { IUsuario } from './../interfaces/IUsuario';
import { BancoService } from './../servicos/banco.service';
import { Component, OnInit } from '@angular/core';
import { DadosService } from '../servicos/dados.service';
import { NavController, IonSlides, AlertController, IonInput } from '@ionic/angular';
import { from } from 'rxjs';
import { async } from 'q';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public murais = [
  ];



  // ngOnInit() {
  //   this.addMural();
  // }

  // public addMural()
  // {
  //   let id=this.dadosService.getId();
  //   this.BancoService.selecionarMuralProf(this.user.crp).then(async(response)=>{
  //     const alert = await this.AlertController.create({
  //       header: 'Confirmação',
  //       subHeader: 'Sucesso!',
  //       message: JSON.stringify(response[0].id_usuario),
  //       buttons: ['OK']
  //     });
      
  //     this.murais.push(response[0]);

  //     await alert.present();
  //   }
  // )
  // .catch(async(response)=>{

  //   const alert = await this.AlertController.create({
  //     header: 'Confirmação',
  //     subHeader: 'Erro!',
  //     message: JSON.stringify(response),
  //     buttons: ['OK']
  //   });

  //   await alert.present()
  // })
     
  //}
  public user: IUsuario;
  constructor(private dadosService: DadosService, private BancoService: BancoService,private AlertController: AlertController)
  { 
  this.user=dadosService.getDados("user")
  }
  


  async inserirMural()
  {
    let titulo = (<HTMLInputElement>document.getElementById("1")).value;
    let texto = (<HTMLInputElement>document.getElementById("2")).value;
    let id=null;

    this.BancoService.inserirMural(titulo,texto,id,this.user.crp).then(async(response)=>{
      const alert = await this.AlertController.create({
        header: 'Confirmação',
        subHeader: 'Sucesso!',
        message: JSON.stringify(response),
        buttons: ['OK']
      });
      
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
