import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassandoDadosService {

  private dados = [];

  constructor() { }

  // Método para adicionar dados ao serviço
  public setDados(nome: string, dados: any) {
    // Verifica se o nome existe e se não está vazio.
    if (nome && nome.trim() !== '') {
      // Cria um indice no array com o nome do dado e coloca os dados dentro.
      this.dados[nome.trim()] = dados;
    }
  }

  // Método para pegar dados do serviço;
  public getDados(nome: string) {
    // Verifica se o nome não está vazio e se ele existe no array.
    if (nome.trim() !== '' && this.dados[nome.trim()]) {
      // Retorna os dados salvos no array.
      return this.dados[nome.trim()];
    } else {
      // Retorna nulo caso o nome não exista no indice.
      return null;
    }
  }

  // Método para limpar os dados guardados
  public removeDados(todos: boolean, nome: string) {
    // Caso deseje apagar todos os dados armazenados.
    if (todos) {
      this.dados = null;
      this.dados = [];
    } else if (nome.trim() !== '') {
      const index = this.dados.indexOf(nome);
      this.dados.splice(index, 1);
    }
  }
}
