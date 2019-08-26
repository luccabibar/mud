import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BancoService } from './../../servicos/banco.service';
import { DadosService } from './../../servicos/dados.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ficha-paciente',
  templateUrl: './ficha-paciente.page.html',
  styleUrls: ['./ficha-paciente.page.scss'],
})
export class FichaPacientePage implements OnInit {

  public paciente;
  public profissional;

  ionViewDidEnter() {
    this.profissional = this.ds.getDados("user");
    if (!this.profissional) {
      this.ds.removeDados(true, '');
      this.router.navigateByUrl("/login");
    }
  }

  /**
   * busca por dados necessarios para carregar essa pagina no banco, a partir de um id fornecido
   * 
   * @param id o id a procurar
   */
  getDadoInicial(id){
    let sql = "select sintoma_id, priemira_crise, situacao_sintoma, intolerancia from dado_inicial " +
      "join sintoma on dado_inicial.sintoma_id = sintoma.nome " + 
      "where usuario_id = " + id;
    console.log(sql);
  }

  constructor(
    private router: Router,
    private ds: DadosService,
    private db: BancoService,
    private alertController: AlertController
  ) {
    this.paciente = this.ds.getDados("user_sessao");
    this.getDadoInicial(this.paciente.id_usuario);
  }

  ngOnInit() {
  }

}
