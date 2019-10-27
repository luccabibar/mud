import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, Renderer, ViewChild, Input} from '@angular/core';
import { NavController, AlertController, IonInput} from '@ionic/angular';
import { DadosService } from '../dados.service';
import { BancoService } from './../banco.service';
import { identifierModuleUrl, ReturnStatement } from '@angular/compiler';
import { parseSelectorToR3Selector } from '@angular/compiler/src/core';
import { all } from 'q';
import { interval } from 'rxjs';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  
  constructor(private nav: NavController, public alertController: AlertController,   private router: Router, private dadosService: DadosService, private BancoService: BancoService) {}
  testa: any;
  testa2: any;
  dataInicio = "INICIO";
  dataFinal = "FINAL";

  ngOnInit()
  {

// Create an Observable that will publish a value on an interval
const secondsCounter = interval(5000);
// Subscribe to begin publishing values
secondsCounter.subscribe(n =>{  this.dadosService.Notificacao();});
  }
  relatcrise()
  {
    this.router.navigateByUrl('/animacao');
  }

  async relatsem()
  {
    // Data do dia em que a pessoa quer preencher
    var dataHj =  new Date();
    var anoHj = dataHj.getFullYear();
    var diaHj = dataHj.getDate();
    var mesHj = dataHj.getMonth() + 1;
    var nam = anoHj + "-" + mesHj + "-" + diaHj;
    
    // Verifica se o mês e o dia são menores que 10
    if(mesHj < 10)
    {
       nam = nam.substr(0,5) + 0 + nam.substr(5,4);
    }
    if(diaHj < 10)
    {
      nam = nam.substr(0,8) + 0 + nam.substr(8,2);
    }

    // Verifica se faz no mínimo 7 dias que a pessoa preencheu o último relatório
    this.liberaRelat(nam, diaHj, mesHj, anoHj);
    
  }

  /*async relatsem()
  {
    var dataUlt;
    var dataatual = new Date();
    var dd = String(dataatual.getDate()).padStart(2, '0');
    var mm = String(dataatual.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = dataatual.getFullYear();

    var datinha = dd + '/' + mm + '/' + yyyy;

    this.BancoService.selectGenerico("SELECT * FROM semana WHERE usuario_id ='"+this.dadosService.getId()+"'ORDER BY created_at DESC LIMIT 1;")
    .then(async(Response)=>{// Se achar esse ID no banco de relatorios semanais
      dataUlt = new Date(Response[0]['data_final']);})
      .catch(async(response)=>{
        console.log('Erro');
      })

      
      const alert = await this.alertController.create({
        header: "Teste",
        message: "<p>Data de hoje: "+datinha+"</p><p>Último envio em:"+dataUlt+"</p>",
        buttons: ['OK']
      });
    
      await alert.present();
    

  }*/


  liberaRelat(alldato, dato, meso, anoagr)
  {
    var dayDif = 0; // Verifica diferença bruta dos dias
    var difMes = 0; // Verifica diferença bruta dos meses
    var dataUlt= ""; // Data completa do último preenchimento
    var diUlt = 0; // dia ----
    var meUlt = 0; // mes ---
    var anoUlt = 0; // ano ---
    var voltad; // usada pra retornar
    var voltaa; // Variável retornada
    this.BancoService.selectGenerico("SELECT * FROM semana WHERE usuario_id ='"+this.dadosService.getId()+"'ORDER BY created_at DESC LIMIT 1;")
    .then(async(Response)=>{// Se achar esse ID no banco de relatorios semanais
      dataUlt = Response[0]['data_final'];
      dataUlt = dataUlt.substr(0, 10);
      diUlt= parseInt(dataUlt.substr(8,2));
      meUlt = parseInt(dataUlt.substr(5,2));
      difMes = meso - meUlt;
      anoUlt = parseInt(dataUlt.substr(0,4));
      dayDif = dato - diUlt;
      

      //Validações para ver se faz pelo menos uma semana q a pessoa preencheu
      if(difMes == 0 && anoUlt == anoagr) //se o último a ser preenchido foi no msm ano e no msm mês
      {
        if(dayDif >= 7) //faz mais de 7 dias q ele preencheu
        {
          voltad = dato - 7; 
          voltaa = anoagr + "-" + meso + "-" + voltad;
          this.deubom(meso, dato, voltaa, alldato) // envia o mês atual, dia atual, data em que a semana começa a contar e o data em que a semana termina (data atual)
        }
        else
        {
          this.deuruim(); //Não faz uma semana
        }
      }
      else if(difMes == 1 && anoUlt == anoagr) //Se o último relatório que a pessoa preencheu foi mês passado do mesmo ano
      {
        if(meUlt == 1|| meUlt == 3 || meUlt == 5 || meUlt == 7 || meUlt == 8 || meUlt == 10 || meUlt == 12) //Meses com 31 dias
        {
          dayDif = (31 - diUlt) + dato; 
          if(dayDif == 7 && dato <= 7) //Faz mais que 7 dias que a pessoa preencheu E ainda não se passaram 7 dias do mês atual
          {
            voltad = 31 - (7 - dato);
            voltaa = anoagr + "-" + meUlt + voltad;
            this.deubom(meUlt, dato, voltaa, alldato);
          } 
          else if(dayDif > 7 && dato > 7)//Faz mais que 7 dias que a pessoa preencheu E se passaram mais que 7 dias do mês atual
          {
            voltad = dato - 7;
            voltaa = anoagr + "-" + meso + "-" + voltad;
            this.deubom(meso, voltad, voltaa, alldato);
          }
          else // faz menos que 7 dias
          {
            this.deuruim();
          }
        }
        else if(meUlt == 2)// Se faz 1 mês que preencheu e o mês passado foi fevereiro
        {
          if ((anoUlt % 4 == 0) && ((anoUlt % 100 != 0) || (anoUlt % 400 == 0)))//Confere se o ano é bissexto
          {
            dayDif = (29 - diUlt) + dato; //é ano bissexto - diferença de dias
            if(dayDif == 7 && dato <= 7) //Faz mais que 7 dias que a pessoa preencheu E ainda não se passaram 7 dias do mês atual
            {
              voltad = 29 - (7 - dato);
              voltaa = anoagr + "-" + meUlt + "-" + voltad;
              this.deubom(meUlt, voltad, voltaa, alldato);
            } 
            else if(dayDif > 7 && dato > 7)//Faz mais que 7 dias que a pessoa preencheu E se passaram mais que 7 dias do mês atual
            {
              voltad = dato - 7;
              voltaa = anoagr + "-" + meso + "-" + voltad;
              this.deubom(meso, voltad, voltaa, alldato);
            }
            else // faz menos que 7 dias
            {
              this.deuruim();
            }
          }
          else
          {
            dayDif = (28 - diUlt) + dato; //é ano bissexto - diferença de dias
            if(dayDif == 7 && dato <= 7) //Faz mais que 7 dias que a pessoa preencheu E ainda não se passaram 7 dias do mês atual
            {
              voltad = 28 - (7 - dato);
              voltaa = anoagr + "-" + meUlt + "-" + voltad;
              this.deubom(meUlt, voltad, voltaa, alldato);
            } 
            else if(dayDif > 7 && dato > 7)//Faz mais que 7 dias que a pessoa preencheu E se passaram mais que 7 dias do mês atual
            {
              voltad = dato - 7;
              voltaa = anoagr + "-" + meso + "-" + voltad;
              this.deubom(meso, voltad, voltaa, alldato);
            }
            else // faz menos que 7 dias
            {
              this.deuruim();
            }
          }
        }
        else
        {
          dayDif = (30 - diUlt) + dato;
            if(dayDif == 7 && dato <= 7) //Faz mais que 7 dias que a pessoa preencheu E ainda não se passaram 7 dias do mês atual
            {
              voltad = 30 - (7 - dato);
              voltaa = anoagr + "-" + meUlt + "-" + voltad;
              this.deubom(meUlt, voltad, voltaa, alldato);
            } 
            else if(dayDif > 7 && dato > 7)//Faz mais que 7 dias que a pessoa preencheu E se passaram mais que 7 dias do mês atual
            {
              voltad = dato - 7;
              voltaa = anoagr + "-" + meso + "-" + voltad;
              this.deubom(meso, voltad, voltaa, alldato);
            }
            else // faz menos que 7 dias
            {
              this.deuruim();
            }
        }
      }
      else // Se faz mais de dois meses que a pessoa preencheu
      {
        if(dato > 7) // Já passou do dia 7 do mês atual
        {
          voltad = dato - 7;
          voltaa = anoagr + "-" + meso + "-" + voltad;
          this.deubom(meso, voltad, voltaa, alldato);
        }
        else //Ainda não passou do dia 7 do mês atual
        {
          if(meso == 5 || meso == 7 || meso == 10 || meso == 12) // Se o mês atual tem 31 dias (em que o mês anterior terá 30 dias)
          {
            voltad = 30 - (7 - dato);
            voltaa = anoagr + "-" + meso-- + "-" + voltad;
            this.deubom(meso--, voltad, voltaa, alldato);
          }
          else if(meso == 3) // Se o mês atual é março
          {
              if ((anoagr % 4 == 0) && ((anoagr % 100 != 0) || (anoagr % 400 == 0))) // Confere se o ano atual é bissexto
              {
                  voltad = 29 - (7 - dato); // é ano bissexto
                  voltaa = anoagr + "-" + meso-- + "-" + voltad;
                  this.deubom(meso--, voltad, voltaa, alldato);
              }
              else // não é ano bissexto
              {
                  voltad = 28 - (7 - dato);
                  voltaa = anoagr + "-" + meso-- + "-" + voltad;
                  this.deubom(meso--, voltad, voltaa, alldato);
              }
          }
          else //Se o mês atual tem 30 dias e o mês anterior tem 31 dias
          { 
              voltad = 31 - (7 - dato);
              if(meso == 1) //se estiver em janeiro 
              {
                  voltaa = anoagr-- + "-" + 12 + "-" + voltad;
                  this.deubom(12, voltad, voltaa, alldato);
              }
              else //qualquer outro mês
              {
                  voltaa = anoagr + "-" + meso-- + "-" + voltad;
                  this.deubom(meso--, voltad, voltaa, alldato);
              }
          }
      }

    }
  })
    .catch(async(response)=>{

      if(dato > 7) // Já passou do dia 7 do mês atual
        {
          voltad = dato - 7;
          voltaa = anoagr + "-" + meso + "-" + voltad;
          this.deubom(meso, voltad, voltaa, alldato);
        }
        else //Ainda não passou do dia 7 do mês atual
        {
          if(meso == 5 || meso == 7 || meso == 10 || meso == 12) // Se o mês atual tem 31 dias (em que o mês anterior terá 30 dias)
          {
            voltad = 30 - (7 - dato);
            voltaa = anoagr + "-" + meso-- + "-" + voltad;
            this.deubom(meso--, voltad, voltaa, alldato);
          }
          else if(meso == 3) // Se o mês atual é março
          {
              if ((anoagr % 4 == 0) && ((anoagr % 100 != 0) || (anoagr % 400 == 0))) // Confere se o ano atual é bissexto
              {
                  voltad = 29 - (7 - dato); // é ano bissexto
                  voltaa = anoagr + "-" + meso-- + "-" + voltad;
                  this.deubom(meso--, voltad, voltaa, alldato);
              }
              else // não é ano bissexto
              {
                  voltad = 28 - (7 - dato);
                  voltaa = anoagr + "-" + meso-- + "-" + voltad;
                  this.deubom(meso--, voltad, voltaa, alldato);
              }
          }
          else //Se o mês atual tem 30 dias e o mês anterior tem 31 dias
          { 
              voltad = 31 - (7 - dato);
              if(meso == 1) //se estiver em janeiro 
              {
                  voltaa = anoagr-- + "-" + 12 + "-" + voltad;
                  this.deubom(12, voltad, voltaa, alldato);
              }
              else //qualquer outro mês
              {
                  voltaa = anoagr + "-" + meso-- + "-" + voltad;
                  this.deubom(meso--, voltad, voltaa, alldato);
              }
          }
      }

      /*const alert = await this.alertController.create({
        header: 'DEU ERRO',
        message: 'Não será possível inserir outro mural semanal em menos de uma semana!',
        buttons:  [
          {
            text: 'OK',
          }
        ],
      });
  
      await alert.present();*/
    })
  }

  async deuruim()
  {
    const alert = await this.alertController.create({
      header: "Preenchimento indisponível",
      message: "Você precisa esperar que se passe outra semana para preencher o relatório",

      buttons: ['OK']
    });
  
    await alert.present();
  }

  async deubom(mesoo, datoo, volta, alldatoo)
  {
    
    // Verifica se o mês e o dia são menores que 10
    if(mesoo < 10)
    {
       volta = volta.substr(0,5) + 0 + volta.substr(5,4);
    }
    if(datoo < 10)
    {
      volta = volta.substr(0,8) + 0 + volta.substr(8,2);
    }

    this.testa = new Date(alldatoo);
    this.testa.setDate(this.testa.getDate()+1);
    this.testa2 = new Date(volta);
    this.testa2.setDate(this.testa2.getDate()+1);

    this.dadosService.setData_relatorioS_F(this.testa);
    this.dadosService.setData_relatorioS_I(this.testa2);
    this.nav.navigateForward('relatorio-semanal');
  }

}

