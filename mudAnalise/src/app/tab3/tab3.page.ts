import { Router } from '@angular/router';
import { IUsuario } from './../interfaces/IUsuario';
import { BancoService } from './../servicos/banco.service';
import { Component, OnInit, Input } from '@angular/core';
import { DadosService } from '../servicos/dados.service';
import { NavController, IonSlides, AlertController, IonInput } from '@ionic/angular';
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

  public murais = [
  ];



   ngOnInit() {
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
    private AlertController: AlertController,
    private router: Router,
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

  public deleteMural(mural)
  {
    
  this.BancoService.deletarMural(this.user_sessao.id_usuario, this.profissional.id_usuario, mural.id_mural).then(async (response) => {
    const alert = await this.AlertController.create({
      header: 'deletou',
      subHeader: 'Deletado!',
      message: JSON.stringify(response),
      buttons: ['OK']
    });
    let index = this.findContatoIndex(mural.id_mural);
    this.murais.splice(index, 1);
    await alert.present();
  }
  )
    .catch(async (response) => {

      const alert = await this.AlertController.create({
        header: 'deu ruim',
        subHeader: 'Erro ao deletar!',
        message: JSON.stringify(response),
        buttons: ['OK']
      });

      await alert.present();
    })
  }
  public addMural()
  {
    let id=this.dadosService.getId();
    this.BancoService.selecionarMuralProf(this.user_sessao.id_usuario,this.profissional.id_usuario).then(async(response)=>{
      const alert = await this.AlertController.create({
        header: 'Confirmação',
        subHeader: 'Sucesso!',
        message: JSON.stringify(response[0].id_usuario),
        buttons: ['OK']
      });
      let a=0;
      let n=0;

      do
      {
        this.murais.splice(0,n+1);
        n++;
      }while(response[n]!=null);


      do
      {
        this.murais.push(response[a]);
        a++;
      }while(response[a]!=null);

      let j=0;
      let y =0;
      let colorControl=0;
      let corzita = "";
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
  )
  .catch(async(response)=>{

    const alert = await this.AlertController.create({
      header: 'xiiiii',
      subHeader: 'Erro!',
      message: JSON.stringify(response),
      buttons: ['OK']
    });

    await alert.present()
  })

 }
 findContatoIndex(id) {
  for (let i=0; i < this.murais.length; i++) {
    if(this.murais[i].id_mural == id) {
      return i;
    }
  }
  return null;
}

public async alertaDeletar(mural){
  const alert = await this.AlertController.create({
    header: 'Apagar Resgistro',
    message: 'realmente quer deletar mural?',
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

    // JP, coloquei o campo this.profissional.id_usuario para sring pq o inserir  mural pede isso
    this.BancoService.inserirMural(titulo, texto, this.user_sessao.id_usuario, this.profissional.id_usuario).then(async (response) => {
      const alert = await this.AlertController.create({
        header: 'Confirmação',
        subHeader: 'Sucesso!',
        message: JSON.stringify(response),
        buttons: ['OK']
      });
      this.addMural();
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

        await alert.present();
      })

  }
/**/ 
  async novanota()
  {
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slideNext();
    this.IonSlides.lockSwipes(true);
/*
    const alert = await this.AlertController.create({
      header: 'Nova mensagem',
      inputs: [
        {
          label: 'Título',
          name: 'name1',
          id: '1',
          type: 'text',
          placeholder: 'Insira o título'
        },
        {
          label: 'Texto',
          name: 'name2',
          type: 'text',
          id: '2',
          value: '',
          placeholder: 'Insira o texto...'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Enviar',
          handler: () => {
            this.inserirMural();
          }
        }
      ]
    });

    await alert.present();
  }*/
 }
}
