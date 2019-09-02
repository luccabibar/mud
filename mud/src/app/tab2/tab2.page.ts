import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, Renderer, ViewChild, Input} from '@angular/core';
import { NavController, AlertController, IonInput} from '@ionic/angular';
import { DadosService } from '../dados.service';
import { BancoService } from './../banco.service';
import { identifierModuleUrl, ReturnStatement } from '@angular/compiler';
import { parseSelectorToR3Selector } from '@angular/compiler/src/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  
  constructor(private nav: NavController, public alertController: AlertController,   private router: Router, private dadosService: DadosService, private BancoService: BancoService) {}

  dataInicio = "INICIO";
  dataFinal = "FINAL";

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
      diUlt= 1;
      /*parseInt(dataUlt.substr(8,2))*/
      meUlt = 9;
      /*parseInt(dataUlt.substr(5,2))*/
      difMes = meso - meUlt;
      anoUlt = 2019;
      /*parseInt(dataUlt.substr(0,4))*/
      dayDif = dato - diUlt;
      
      if(difMes == 0 && anoUlt == anoagr)
      {
        if(dayDif <= 7)
        {
          voltad = dato + 7;
          voltaa = anoagr + "-" + meso + "-" + voltad;
          this.deubom(meso, dato, voltaa, alldato)
        }
        else
        {
          this.deuruim();
        }
      }
      else if(difMes == 1 && anoUlt == anoagr)
      {
        if(meUlt == 1|| meUlt == 3 || meUlt == 5 || meUlt == 7 || meUlt == 8 || meUlt == 10 || meUlt == 12)
        {
          dayDif = (31 - diUlt) + dato;
          if(dayDif >= 7)
          {
            voltad = 31 - (7 - dato);
            voltaa = anoagr + "-" + meso-- + voltad;
            return voltaa;
          } 
          else
          {
            /////
          }
        }
        else if(meUlt == 2)
        {
          if ((anoUlt % 4 == 0) && ((anoUlt % 100 != 0) || (anoUlt % 400 == 0)))
          {
            dayDif = (29 - diUlt) + dato;
            if(dayDif >= 7)
            {
              voltad = 29 - (7 - dato);
              voltaa = anoagr + "-" + meso-- +"-" + voltaa;
              return voltaa;
            }
            else
            {
              ///////
            }
          }
          else
          {
            dayDif = (28 - diUlt) + dato;
            if(dayDif >= 7)
            {
              voltad = 28 - (7 - dato);
              voltaa = anoagr + "-" + meso-- +"-" + voltaa;
              return voltaa;
            }
            else 
            {
              ////
            }
          }
        }
        else
        {
          dayDif = (30 - diUlt) + dato;
          if(dayDif >= 7)
          {
            voltad = 30 - (7 - dato);
            voltaa = anoagr + "-" + meso +"-" + voltaa;
            return voltaa;
          }
          else
          {
            ///////
          }
        }
      }
      else
      {
        if(dato > 7)
        {
          voltad = dato - 7;
          voltaa = anoagr + "-" + meso + "-" + voltad;
          return voltaa;
        }
        else 
        {
          if(meso == 5 || meso == 7 || meso == 10 || meso == 12)
          {
            voltad = 30 - (7 - dato);
            voltaa = anoagr + "-" + meso-- + "-" + voltad;
            return voltaa;
          }
          else if(meso == 3)
          {
              if ((anoagr % 4 == 0) && ((anoagr % 100 != 0) || (anoagr % 400 == 0)))
              {
                  voltad = 29 - (7 - dato);
                  voltaa = anoagr + "-" + meso-- + "-" + voltad;
                  return voltaa;
              }
              else
              {
                  voltad = 28 - (7 - dato);
                  voltaa = anoagr + "-" + meso-- + "-" + voltad;
                  return voltaa;
              }
          }
          else
          { 
              voltad = 31 - (7 - dato);
              if(meso == 1)
              {
                  voltaa = anoagr-- + "-" + 12 + "-" + voltad;
                  return voltaa;
              }
              else
              {
                  voltaa = anoagr + "-" + meso-- + "-" + voltad;
                  return voltaa;
              }
          }
      }

    }
  })
    .catch(async(response)=>{

      const alert = await this.alertController.create({
        header: 'DEU ERRO',
        message: 'Não será possível inserir outro mural semanal em menos de uma semana!',
        buttons:  [
          {
            text: 'OK',
          }
        ],
      });
  
      await alert.present();
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

    //CONVERTER PARA TIPO DATA
    const alert = await this.alertController.create({
      header: "Relatório Semanal",
       subHeader: "Confirmar Data",
       message: volta + " " + alldatoo,

        buttons: [
        {
        text: 'Cancelar',
        role: 'cancelar',
        handler: data => {
        console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirmar',
        handler: data => {//Converter essas datas pra date type 
            //this.dadosService.setData_relatorioS_I = data.dataHj;
            this.dadosService.setData_relatorioS_F = data.alldato;
            this.nav.navigateForward('relatorio-semanal');
                          }
          }
          ]
        });
  
      await alert.present();
  }

}

