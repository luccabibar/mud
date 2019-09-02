import { Component, OnInit } from '@angular/core';

import { BancoService } from '../../servicos/banco.service';
import { DadosService } from '../../servicos/dados.service';

@Component({
  selector: 'app-grafico-semanal',
  templateUrl: './grafico-semanal.page.html',
  styleUrls: ['./grafico-semanal.page.scss'],
})
export class GraficoSemanalPage implements OnInit {

  paciente;
  semana;
  alimentacao;
  atividade;
  bemEstar;

  /**
   * a partir de um id de um usuario, pega todas as semanas, e para cada semana,
   * pega todos os dados relacionados a aquela semana semana
   * 
   * @param id o id do usuario
   */
  pegaDados(id)
  {
    /*
      motivos para fazer 3 querys ao invez de apenas um gandao
        - mais organizado
        - quase o mesmo tempo de execucao no banco
        - api suporta retorno de multiplos requests
    */
    let sql = "SELECT sem.data_inicial, sem.observacao, " +
      "ali.carboidratos, ali.proteinas, ali.laticinios, ali.verd_frut, ali.hidratacao, " +
      "atv.a_realizou, atv.tempo, atv.intensidade, " +
      "bem.b_realizou, bem.vezes, bem.comentario " +
      "FROM semana AS sem " +
      "JOIN alimentacao AS ali ON sem.id_semana = ali.semana_id " +
      "JOIN atividade_fisica AS atv ON sem.id_semana = atv.semana_id " +
      "JOIN bem_estar AS bem ON sem.id_semana = bem.semana_id " +
      "WHERE sem.usuario_id = " + id + "; ";

    this.db.selectGenerico(sql)
    .then((resp: any) => 
    {
      console.log(resp);
      this.semana = {
        "inicio": resp.data_inicial,
        "obs": resp.observacao
      };
      this.alimentacao = {
        "carbs": resp.carboidratos,              
        "prots": resp.proteinas,              
        "latcs": resp.laticinios,              
        "verds": resp.verd_frut,              
        "agua": resp.hidratacao                
      };
      this.atividade = {
        "realz": resp.a_realizou,
        "tempo": resp.tempo,
        "ints": resp.intensidade
      };
      this.bemEstar = {
        "realz": resp.b_realizou,
        "vezes": resp.vezes,
        "obs": resp.comentario
      };
    })
    .catch(ex => 
    {
      console.log("err: ", ex);      
    })
  }

  constructor(private db: BancoService, private data: DadosService) {
    this.paciente = this.data.getDados("user_sessao");
    this.pegaDados(this.paciente.id_usuario);
   }

  ngOnInit() {
  }

}
