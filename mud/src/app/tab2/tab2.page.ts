import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, Renderer, ViewChild, Input} from '@angular/core';
import { NavController, AlertController, IonInput} from '@ionic/angular';
import { DadosService } from '../dados.service';
import { BancoService } from './../banco.service';
import { identifierModuleUrl, ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  
  constructor(private nav: NavController, public alertController: AlertController,   private router: Router, private dadosService: DadosService, private BancoService: BancoService) {}

  dataInicio = "TesteInicio";
  dataFinal = "TestFinal";

  relatcrise()
  {
    this.router.navigateByUrl('/animacao');
  }

  async relatsem()
  {/*
    var libera = null;
    var dataHj =  new Date();

    
    var diaHj = dataHj.getDay();
    var mesHj = dataHj.getMonth();
    libera = this.liberaRelat(dataHj, diaHj, mesHj);
*/

    const alert = await this.alertController.create({
    header: "Relatório Semanal",
    subHeader: "Confirmar Data",
    message: "A data do último relatório enviado foi de:<br><br><b>"+this.dataInicio+"</b><br><br>até:<br><br><b>"+this.dataFinal+"</b><br>",

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
          this.dadosService.setData_relatorioS_I = data.dataInicio;
          this.dadosService.setData_relatorioS_F = data.dataFim;
          this.nav.navigateForward('relatorio-semanal');
        }
      }
    ]
  });
    
    await alert.present();
  }

  liberaRelat(alldato, dato, meso)
  {
    var dayDif = 0;
    var dataUlt= "";
    var diUlt = 0;
    var meUlt = 0;
    var difMes = 0;
    var anoUlt = 0;
    this.BancoService.selectGenerico("SELECT * FROM semana WHERE usuario_id ='"+this.dadosService. getId()+"'ORDER BY created_at DESC LIMIT 1;")
    .then(async(Response)=>{
      dataUlt = Response[0]['data_final'];
      diUlt= parseInt(dataUlt.substr(8,2));
      meUlt = parseInt(dataUlt.substr(5,2));
      difMes = meso - meUlt;
      anoUlt = parseInt(dataUlt.substr(0,4));
      dayDif = dato - diUlt;
      if(difMes == 0)
      {
        if(dayDif >= 7)
        {
          return true;
        }
        else
        {
          // aaaaaaaaaaa
        }
      }
      else if(difMes == 1)
      {
        if(meUlt == 1|| meUlt == 3 || meUlt == 5 || meUlt == 7 || meUlt == 8 || meUlt == 10 || meUlt == 12)
        {
          dayDif = (31 - diUlt) + dato;
          if(dayDif >= 7)
          {
            return true;
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
              return true;
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
              return true;
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
            return true;
          }
          else
          {
            ///////
          }
        }
      }
      else
      {
        return true;
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

