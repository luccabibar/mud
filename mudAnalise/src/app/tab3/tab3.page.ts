import { Router } from '@angular/router';
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

  public profissional: IUsuario;
  public user_sessao;


  constructor(
    private dadosService: DadosService,
    private BancoService: BancoService,
    private AlertController: AlertController,
    private router: Router
  ) {
    this.profissional = dadosService.getDados("user");
    this.user_sessao = this.dadosService.getDados("user_sessao");

  }

  ionViewDidEnter() {
    this.profissional = this.dadosService.getDados("user");
    if (!this.profissional) {
      this.dadosService.removeDados(true, '');
      this.router.navigateByUrl("/login");
    }
  }


  async inserirMural() {
    let titulo = (<HTMLInputElement>document.getElementById("1")).value;
    let texto = (<HTMLInputElement>document.getElementById("2")).value;
    let id = null;

    // JP, coloquei o campo this.profissional.id_usuario para sring pq o inserir  mural pede isso
    this.BancoService.inserirMural(titulo, texto, this.user_sessao.id_usuario, this.profissional.id_usuario.toString()).then(async (response) => {
      const alert = await this.AlertController.create({
        header: 'Confirmação',
        subHeader: 'Sucesso!',
        message: JSON.stringify(response),
        buttons: ['OK']
      });

      await alert.present();
    }
    )
      .catch(async (response) => {

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
