import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, Renderer, ViewChild, Input} from '@angular/core';
import { NavController, AlertController, IonInput} from '@ionic/angular';
import { DadosService } from '../dados.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  
  constructor(private nav: NavController, public alertController: AlertController,   private router: Router, private dadosService: DadosService) {}

  dataInicio = "TesteInicio";
  dataFinal = "TestFinal";

  pegarUltimoRelatorio()
  {
    
  }

  relatcrise()
  {
    this.router.navigateByUrl('/animacao');
  }
  async relatsem()
  {
    this.pegarUltimoRelatorio();
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
}

