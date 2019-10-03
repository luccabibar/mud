import { FirebasebdService } from './../servicos/firebasebd.service';
import { Router } from '@angular/router';
import { IUsuario } from './../interfaces/IUsuario';
import { BancoService } from './../servicos/banco.service';
import { Component, OnInit, Input } from '@angular/core';
import { DadosService } from '../servicos/dados.service';
import { NavController, IonSlides, AlertController, IonInput, LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { async } from 'q';
import { setFirstTemplatePass } from '@angular/core/src/render3/state';
import { IonContent } from '@ionic/angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild(IonSlides) IonSlides: IonSlides;
  @ViewChild(IonContent) content: IonContent;

  stringo: string;
  stringo2: string;

  public murais = [
  ];

  ngOnInit() {
    this.IonSlides.updateAutoHeight();
    this.addMural();
    this.IonSlides.lockSwipes(true);
  }

  doRefresh(event) {
    this.addMural();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  public profissional: IUsuario;
  public user_sessao;



  constructor(
    private dadosService: DadosService,
    private BancoService: BancoService,
    private FirebasebdService: FirebasebdService,
    private AlertController: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController
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

  /**
  * Apaga mural
   */
  public deleteMural(mural) {

    this.BancoService.deletarMural(this.user_sessao.id_usuario, this.profissional.id_usuario, mural.id_mural)
      .then(async (response) => {
        /*const alert = await this.AlertController.create({
          header: 'deletou',
          subHeader: 'Deletado!',
          message: JSON.stringify(response),
          buttons: ['OK']
        });*/
        let index = this.findContatoIndex(mural.id_mural);
        this.murais.splice(index, 1);
        //await alert.present();
      }
      )
      .catch(async (response) => {

        const alert = await this.AlertController.create({
          header: 'ERRO!',
          subHeader: 'Erro ao deletar nota!',
          message: JSON.stringify(response),
          buttons: ['OK']
        });

        await alert.present();
      })
  }

  public addMural() {

    document.getElementById("divo1").style.display = 'unset';
    document.getElementById("divo2").style.display = 'none';

    let dato = "";
    let id = this.dadosService.getId();
    this.BancoService.selecionarMuralProf(this.user_sessao.id_usuario, this.profissional.id_usuario)
      .then(async (response) => {
        //const alert = await this.AlertController.create({
        //  header: 'Abrindo mural',
        //  subHeader: 'Aguarde o carregamento...'
        //});
        let loading = await this.loadingCtrl.create({
          //message: 'Processando...'
        });
        let a = 0;
        let n = 0;
        let j = 0;
        let y = 0;
        let corzita = "";


        do {
          this.murais.splice(0, n + 1);
          n++;
        } while (response[n] != null);


        do {
          dato = response[a]['created_at'];
          dato = dato.substr(8, 2) + "/" + dato.substr(5, 2) + "/" + dato.substr(0, 4);
          this.murais.push(response[a]);
          this.murais[a].created_at = dato;
          a++;
          dato = "";
        } while (response[a] != null);


        do {
          switch (j) {
            case 0:
              corzita = "rgba(0,102,255, 1)";//"#FFCCBC"; 'rgba(255, 255, 255,'+opacidade+')'
              break;
            case 1:
              corzita = "rgba(170,204,255, 1)";//"#DCEDC8";
              break;
            case 2:
              corzita = "rgba(69,170,242, 1)";//"#DCEDC8";
              break;
            case 3:
              corzita = "rgba(74,116,217, 1)"//"#B3E5FC"; 
              j = -1;
              break;
          }

          await loading.present();
          document.getElementsByName("ion-card-header")[y].style.backgroundColor = corzita;
          j++;
          y++;

        } while (this.murais[y] != null)
        loading.dismiss();
      }
      )
      .catch(async (response) => {

        const alert = await this.AlertController.create({
          header: 'Erro!',
          subHeader: 'Erro na conexão',
          //message: JSON.stringify(response),
          buttons: ['OK']
        });

        await alert.present()
      })

  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }


  findContatoIndex(id) {
    for (let i = 0; i < this.murais.length; i++) {
      if (this.murais[i].id_mural == id) {
        return i;
      }
    }
    return null;
  }

  public async alertaDeletar(mural) {
    const alert = await this.AlertController.create({
      header: 'Apagar nota',
      message: 'Tem certeza que deseja deletar essa nota?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {

            this.deleteMural(mural);
          }
        }
      ]

    });
    await alert.present();
  }



  async inserirMural() {

    let titulo = (<HTMLInputElement>document.getElementById("1")).value;
    let texto = (<HTMLInputElement>document.getElementById("2")).value;
    this.BancoService.selectGenerico("SELECT * FROM  notificacao WHERE id_user="+this.user_sessao.id_usuario+";").then(async (resposta) => {
      console.log(resposta);
    this.FirebasebdService.criar_Novo(resposta[0].token);
    });
    // JP, coloquei o campo this.profissional.id_usuario para sring pq o inserir  mural pede isso
    this.BancoService.inserirMural(titulo, texto, this.user_sessao.id_usuario, this.profissional.id_usuario).then(async (response) => {
      /*const alert = await this.AlertController.create({
        header: 'Confirmação',
        subHeader: 'Sucesso!',
        //message: JSON.stringify(response),
        buttons: ['OK']
      });*/
      this.addMural();
      //await alert.present();
    }
    )
      .catch(async (response) => {

        const alert = await this.AlertController.create({
          header: 'Erro!',
          subHeader: 'Erro ao inserir nova nota.',
          buttons: ['OK']
        });

        await alert.present();
      })

    this.stringo = "";
    this.stringo2 = "";
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slidePrev();
    this.IonSlides.lockSwipes(true);
  }
  /**/
  async novanota() {
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slideNext();
    this.IonSlides.lockSwipes(true);

    document.getElementById("divo1").style.display='none';
    document.getElementById("divo2").style.display='unset';
    this.stringo = "";
    this.stringo2 = "";
 }

  voltanovanota() {
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slidePrev();
    this.IonSlides.lockSwipes(true);

    this.addMural();
  }
}
