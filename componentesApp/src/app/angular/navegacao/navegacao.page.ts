import { Component, OnInit } from '@angular/core';

// Para navegação por métodos devemos importar o Router
import { Router } from '@angular/router';

// Serviço responsavel por enviar e receber dados complexos.
import { PassandoDadosService } from '../../servicos/passando-dados.service';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.page.html',
  styleUrls: ['./navegacao.page.scss'],
})
export class NavegacaoPage implements OnInit {

  // Variavel para enviar dados simples
  public numero;

  // Variavel para enviar dados complexos
  public objeto = {};

  // Devemos criar uma variavel para utilizar o Router
  // Caso utilize parametros completos, devemos importar o serviço responsavel
  constructor(private router: Router, private enviarDados: PassandoDadosService) { }

  ngOnInit() {
  }

  public navegacaoSimples() {
    // Para esse funcionr, não esqueça de configurar a rota
    // Primeiro passamos a rota, depois o valor
    this.router.navigate(['/recebendo-parametros', this.numero]);
  }

  public navegacaoComMuitosDados() {
    // Cria um objeto preenchido para enviar
    this.objeto = { nome: 'Objeto 1', idade: 51 };
    // Chama o serviço e coloca os dados que deseja enviar;
    this.enviarDados.setDados('objeto1', this.objeto);

    // Cria um objeto preenchido diferente para enviar
    this.objeto = { nome: 'Objeto Diferente', altura: 1.5 };
    // Chama o serviço e coloca os dados que deseja enviar;
    this.enviarDados.setDados('objeto2', this.objeto);

    // Cria um objeto vazio para enviar
    this.objeto = {};
    // Chama o serviço e coloca os dados que deseja enviar;
    this.enviarDados.setDados('objetoVazio', this.objeto);

    // Tambem podemos enviar dados simples;
    this.enviarDados.setDados('numeroServico', this.numero);

    // Chama a pagina que irá receber os dados.
    this.router.navigate(['/recebendo-dados']);
  }

}
