import { Component, OnInit } from '@angular/core';

// Importação para receber os dados simples.
import { ActivatedRoute } from '@angular/router';

// Serviço responsavel por enviar e receber dados complexos.
import { PassandoDadosService } from '../../servicos/passando-dados.service';


@Component({
  selector: 'app-recebendo-parametros',
  templateUrl: './recebendo-parametros.page.html',
  styleUrls: ['./recebendo-parametros.page.scss'],
})
export class RecebendoParametrosPage implements OnInit {

  // Variavel para receber um dado simples.
  public dadoSimples = null;

  // Variaveis para receber dados complexos.
  public objeto1 = null;
  public objeto2 = null;
  public objetoVazio = null;
  public numeroServico = null;

  constructor(public rota: ActivatedRoute, public recebeDados: PassandoDadosService) { }

  // Método que é executado depois de iniciar a pagina
  // Vamos utilizá-lo para verificar os dados que estão vindo
  ngOnInit() {

    // Verificar se veio os dados simples
    if (this.rota.snapshot.paramMap.get('numero')) {
      // Coloca o valor que veio por parametro na varivel;
      this.dadoSimples = this.rota.snapshot.paramMap.get('numero');
    }

    // Pegar os dados do Serviço
    this.objeto1 = this.recebeDados.getDados('objeto1');
    this.objeto2 = this.recebeDados.getDados('objeto2');
    this.objetoVazio = this.recebeDados.getDados('objetoVazio');
    this.numeroServico = this.recebeDados.getDados('numeroServico');
  }

}
