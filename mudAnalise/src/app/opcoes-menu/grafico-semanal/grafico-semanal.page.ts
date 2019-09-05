import { Component, OnInit } from '@angular/core';

import { BancoService } from '../../servicos/banco.service';
import { DadosService } from '../../servicos/dados.service';

@Component({
  selector: 'app-grafico-semanal',
  templateUrl: './grafico-semanal.page.html',
  styleUrls: ['./grafico-semanal.page.scss'],
})
export class GraficoSemanalPage implements OnInit {

  //dados do paciente (service)
  paciente;
  //dados do paciente (banco)
  semana;
  alimentacao;
  atividade;
  bemEstar;
  //controle da view
  graf;
  semKey;

  /**
   * converte int pra float pQ O ANGULAR NAO CONSEGUE LIDAR COM TIPOS
   * PHP RAINHA ANGULAR NADINHA 
   */
  changeOpt()
  {
    this.semKey = Number.parseInt(this.semKey);
  }

  /**
   * a partir de um id de um usuario, pega todas as semanas, e para cada semana,
   * pega todos os dados relacionados a aquela semana semana
   * 
   * @param id o id do usuario
   */
  pegaDados(id)
  {
    let sql = "SELECT sem.data_inicial, sem.observacao, " +
      "ali.carboidratos, ali.proteinas, ali.laticinios, ali.verd_frut, ali.hidratacao, " +
      "atv.a_realizou, atv.tempo, atv.intensidade, " +
      "bem.b_realizou, bem.vezes, bem.comentario " +
      "FROM semana AS sem " +
      "JOIN alimentacao AS ali ON sem.id_semana = ali.semana_id " +
      "JOIN atividade_fisica AS atv ON sem.id_semana = atv.semana_id " +
      "JOIN bem_estar AS bem ON sem.id_semana = bem.semana_id " +
      "WHERE sem.usuario_id = " + id + " ";
      "ORDER BY sem.data_inicial; ";

    this.db.selectGenerico(sql)
    .then((resp: any) => 
    {
      this.semana = [];
      this.alimentacao = [];
      this.atividade = [];
      this.bemEstar = [];

      resp.forEach(row => 
      {
        let dataIni = (row.data_inicial).split('-');
        dataIni = dataIni[2] + "/" + dataIni[1] + "/" + dataIni[0];

        this.semana.push({
          "data_inicial": dataIni,
          "observacao": row.observacao
        });
        this.alimentacao.push({
          "carboidratos": row.carboidratos,              
          "proteinas": row.proteinas,              
          "laticinios": row.laticinios,              
          "verd_frut": row.verd_frut,              
          "hidratacao": row.hidratacao                
        });
        this.atividade.push({
          "a_realizou": row.a_realizou,
          "tempo": row.tempo,
          "intensidade": row.intensidade
        });
        this.bemEstar.push({
          "b_realizou": row.b_realizou,
          "vezes": row.vezes,
          "comentario": row.comentario
        });
      });

      console.log(resp, this.semana, this.alimentacao, this.atividade, this.bemEstar);
    })
    .catch(ex => 
    {
      console.log("err: ", ex);      
    })
  }

  constructor(private db: BancoService, private data: DadosService) {
    this.paciente = this.data.getDados("user_sessao");
    this.pegaDados(this.paciente.id_usuario);
    this.semKey = 0;
  }

  ngOnInit() {
  }

}
