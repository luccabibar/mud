
import { NavController, IonSlides, AlertController, IonInput } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DadosService } from '../dados.service';
import { BancoService } from '../banco.service';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-relatorio-crise',
  templateUrl: './relatorio-crise.page.html',
  styleUrls: ['./relatorio-crise.page.scss'],
})
export class RelatorioCrisePage implements OnInit {

  @ViewChild(IonSlides) IonSlides: IonSlides;

  public conta = 0;
  public contar = 0;
  public conta3 = 0;

  constructor(public alertController: AlertController,public bancoService: BancoService,public dadosService: DadosService,public navCtrl: NavController) { }

  async ngOnInit() { 
    this.IonSlides.lockSwipes(true);
    await this.sitBanco(null);
    document.getElementById("lblTempo").innerHTML = '- de 10 mins';
    document.getElementById("lblGrau").innerHTML = 'Leve';
    this.selectsitu();
  }

  antSlide() //volta pro slide anterior
  {
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slidePrev();
    this.IonSlides.lockSwipes(true);
    this.conta3--;
    if(this.conta3 == 0)
    {
      document.getElementById("botoes").style.display='none';
      document.getElementById("btnProximo").style.display='unset';
    }
    if(this.conta3 == 2)
    {
      document.getElementById("concluir").style.display='none';
      document.getElementById("botoes").style.display='unset';
    }
  }

  proxSlide() //vai pro proximo slide
  {
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slideNext();
    this.IonSlides.lockSwipes(true);
    this.conta3++;
    if(this.conta3 == 3)
    {
      document.getElementById("botoes").style.display='none';
      document.getElementById("concluir").style.display='unset';
    }
  }

  troca() //troca os botoes
  {
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slideNext();
    this.IonSlides.lockSwipes(true);
    this.conta3++;
    document.getElementById("btnProximo").style.display='none';
    document.getElementById("botoes").style.display='unset';
  }

  mudaLabel() //muda os labels 
  {
    let tempo = (<HTMLInputElement>document.getElementById("tempo")).value;
    if(tempo == "0")
    {
      document.getElementById("lblTempo").innerHTML = '- de 10 mins';
    }
    else if(tempo == "200")
    {
      document.getElementById("lblTempo").innerHTML = '10 - 15 mins';
    }
    else if(tempo == "400")
    {
      document.getElementById("lblTempo").innerHTML = '16 - 30 mins';
    }
    else if(tempo == "600")
    {
      document.getElementById("lblTempo").innerHTML = '31 - 45 mins';
    }
    else if(tempo == "800")
    {
      document.getElementById("lblTempo").innerHTML = '46 - 60 mins';
    }
    else if(tempo == "1000")
    {
      document.getElementById("lblTempo").innerHTML = '+ de 60 mins';
    }
  }

  mudaLabel2() //muda os labels
  {
    let grau = (<HTMLInputElement>document.getElementById("preocupa")).value;
    if(grau == "0")
    {
      document.getElementById("lblGrau").innerHTML = 'Leve';
    }
    else if(grau == "2")
    {
      document.getElementById("lblGrau").innerHTML = 'Moderada';
    }
    else if(grau == "4")
    {
      document.getElementById("lblGrau").innerHTML = 'Forte';
    }
    else if(grau == "6")
    {
      document.getElementById("lblGrau").innerHTML = 'Extrema';
    }
  }

  adicionou_sit = false;

  async addsitu() //adiciona nova situação
  {
    this.adicionou_sit = true;
    document.getElementById("addsitua").style.display='unset';
    document.getElementById("fab2").style.display='unset';
    document.getElementById("escolhersitu").style.display='none';
    document.getElementById("fabuloso").style.display='none';
  }

  async selectsitu() //seleciona uma situação ja existente
  {
    this.adicionou_sit = false;
    document.getElementById("addsitua").style.display='none';
    document.getElementById("fab2").style.display='none';
    document.getElementById("escolhersitu").style.display='unset';
    document.getElementById("fabuloso").style.display='unset';
  }

  addoutras() //mostra e tira botoes
  {
    document.getElementById("outras").style.display='unset';
    document.getElementById("mostram").style.display='none';
  }

  porquem() //mostra a div se estiver acompanhado
  {
    this.contar++;
    if(this.contar==1)
    {
      document.getElementById("acomp").style.display='unset';
    }
    if(this.contar==2)
    {
      document.getElementById("acomp").style.display='none';
      this.contar = 0;
    }
  }

  envRel() //envia o relatorio
  {
    let local_crise = " ";
    local_crise = (<HTMLInputElement>document.getElementById("4")).value;
    
    
    let data_crise = (<HTMLInputElement>document.getElementById("5")).value;

    let duracao_crise = (<HTMLInputElement>document.getElementById("tempo")).value;
    this.dadosService.setDuracao_crise(duracao_crise);


    let acompanhado = true;
    if((<HTMLInputElement>document.getElementById("8")).value)
    {
      acompanhado = false;
    }
    //let acompanhadoNao = (<HTMLInputElement>document.getElementById("9")).value;

    let pessoa_acompanhamento = "-1";
    let acomp_amigo = (<HTMLInputElement>document.getElementById("9")).checked;
    if(acomp_amigo)
    {
      pessoa_acompanhamento = "0";
    }
    // 0 = amigo let acomp_amigo = (<HTMLInputElement>document.getElementById("10")).value
    let acomp_familia = (<HTMLInputElement>document.getElementById("10")).checked;
    let acomp_desc = (<HTMLInputElement>document.getElementById("11")).checked;
    if(acomp_familia)
    {
      pessoa_acompanhamento = "1";
    } else if(acomp_desc)
    {
      pessoa_acompanhamento = "2";
    }


    let sintomas_crise = (<HTMLInputElement>document.getElementById("12")).value;

    let situacoes;
    if(this.adicionou_sit)//Adiciona uma nova situação na qual aconteceu a crise
    {
      situacoes = (<HTMLInputElement>document.getElementById("26")).value;

      this.bancoService.insertGenerico("INSERT INTO situacao(usuario_id,situacao) VALUES ('"+this.dadosService.getId()+"','"+situacoes+"');")
            .then(async(response)=>{
              
            })
              .catch(async(response)=>{
                const alert = await this.alertController.create({
                  header: 'Erro',
                  message: 'Erro ao adicionar nova situação de crise.',
                  buttons:  [
                    {
                      text: 'OK',
                    }
                  ],
                  });

                  await alert.present();
               })
    }
    else{
      situacoes = (<HTMLInputElement>document.getElementById("25")).value;
    }
    
    let intensidade = (<HTMLInputElement>document.getElementById("preocupa")).value;

 
    this.bancoService.relatorio_crise(this.dadosService.getId().toString(),local_crise,sintomas_crise, this.dadosService.getDuracao_crise(),intensidade,situacoes,pessoa_acompanhamento)
    .then(async(response)=>{
        const alert = await this.alertController.create({
          header: 'Relátorio enviado',
          subHeader: 'Novo relátorio enviado',
          message: JSON.stringify(response[0].id_usuario),
          buttons: [
            {
              text: "OK",
              role: "ok",
              handler: data => {
                this.navCtrl.navigateForward('/tabs/tab2');
              }
            },
        ]
        });
         await alert.present();
        
      }
    )
    .catch(async(response)=>{

      const alert = await this.alertController.create({
        header: 'Erro',
        message: JSON.stringify(response),
        buttons: ['OK']
      });
      await alert.present()
    })


  }

  voltar()//Retorna para a página home
  {
    this.navCtrl.navigateBack('tabs/tab2');
  }


  async RetornarListaAnos(){
  //DEVERÁ TER UMA NOVA CONDIÇÃO NO WHERE NO SQL, NO CASO "usuario_id". Para que concatenar com o resto
  let ReturnAnos = await this.bancoService.selectGenerico("SELECT * FROM situacao WHERE usuario_id ="+this.dadosService.getId()+" ORDER BY id ASC;");
  let anos=[];
  for(let i in ReturnAnos)
    anos[i]=ReturnAnos[i].situacao;
    return anos;
  }

  h = [];
  primeiro: any;

  async sitBanco($event = null) {
    this.h = await this.RetornarListaAnos();
    this.primeiro = this.h[0];
    console.log(this.h);
  }

}





