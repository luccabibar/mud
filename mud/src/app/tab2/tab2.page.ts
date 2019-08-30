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
    var libera = null;
    var dataHj =  new Date();
    var anoHj = dataHj.getFullYear();
    var diaHj = dataHj.getDate();
    var mesHj = dataHj.getMonth();
    var nam = anoHj + "-" + mesHj + "-" + diaHj;
    libera = this.liberaRelat(dataHj, diaHj, mesHj);

    //if(mesHj < 10)
    const alert = await this.alertController.create({
    header: "Relatório Semanal",
    subHeader: "Confirmar Data",
    message: "A data do último relatório enviado foi de:<br><br><b>"+libera+"</b><br><br>até:<br><br><b>"+nam+"</b><br>",

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
        handler: data => {
          this.dadosService.setData_relatorioS_I = data.libera;
          this.dadosService.setData_relatorioS_F = data.dataHj;
          this.nav.navigateForward('relatorio-semanal');
        }
      }
    ]
  });
    
    await alert.present();
  }

  liberaRelat(alldato, dato, meso)
  {
    var pega = new Date();
    var anoagr = pega.getFullYear();
    var dayDif = 0;
    var dataUlt= "";
    var diUlt = 0;
    var meUlt = 0;
    var difMes = 0;
    var anoUlt = 0;
    var voltad;
    var voltaa;
    this.BancoService.selectGenerico("SELECT * FROM semana WHERE usuario_id ='"+this.dadosService.getId()+"'ORDER BY created_at DESC LIMIT 1;")
    .then(async(Response)=>{
      dataUlt = Response[0]['data_final'];
      diUlt= parseInt(dataUlt.substr(8,2));
      meUlt = parseInt(dataUlt.substr(5,2));
      difMes = meso - meUlt;
      anoUlt = parseInt(dataUlt.substr(0,4));
      dayDif = dato - diUlt;
      if(difMes == 0 && anoUlt == anoagr)
      {
        if(dayDif >= 7)
        {
          voltad = dato - 7;
          voltaa = anoagr + "-" + meso + "-" + voltad;
          return voltaa;
        }
        else
        {
          // aaaaaaaaaaa
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





}

