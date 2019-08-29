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

  public dados_ini;
  public paciente;
  public profissional;

  ionViewDidEnter() 
  {
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
  getDadoInicial(id)
  {
    //eu JURO que nao copiei esse sql do stackoverflow (nao integralmente)
    let sql = "SELECT d.primeira_crise, d.situacao_sintoma, d.intolerancia, array_agg(s.nome) " +
      "FROM dado_inicial AS d " +
      "JOIN sintoma AS s " +
      "ON s.id_sintoma = ANY(d.sintoma_id) " +
      "WHERE d.usuario_id = " + id + " " +
      "GROUP BY d.primeira_crise, d.situacao_sintoma, d.intolerancia, s.nome";

    this.db.selectGenerico(sql)
    .then((response: Array<any>)=>{
      //concatena os n registros em um so
      let sintomas:Array<String> = [];
      response.forEach(row => {
        let sint: String = row.array_agg;
        sint = sint.slice(2, sint.length - 2); //tira uns chars indesejados da string
        sintomas.push(sint);
      });
      
      this.dados_ini = response[0];
      this.dados_ini.array_agg = sintomas;
    })
    .catch((ex) => {
      console.log("err", ex);
      return;
    });

  }

  constructor(
    private router: Router,
    private ds: DadosService,
    private db: BancoService,
    private alertController: AlertController
  ) {
    this.paciente = this.ds.getDados("user_sessao");
    this.getDadoInicial(this.paciente.id_usuario);
    //let idade = ;
    //this.paciente.idade = ;
    console.log(this.paciente);
  }

  ngOnInit() {
  }

}
