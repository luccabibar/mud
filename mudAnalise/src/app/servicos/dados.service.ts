import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  private dados = [];

  constructor() { }

  Nome = "";
  Cpf = "";
  Email = "";
  Celular = "";
  Profissional = null;
  Crp = "";
  DataNasc = "";
  Id = 0;

  getNome()
  {
    return this.Nome;
  }
  setNome(x: string)
  {
    this.Nome = x;
  }

  getCpf()
  {
    return this.Cpf;
  }
  setCpf(x: string)
  {
    this.Cpf = x;
  }

  getEmail()
  {
    return this.Email;
  }
  setEmail(x: string)
  {
    this.Email = x;
  }

  getCelular()
  {
    return this.Celular;
  }
  setCelular(x: string)
  {
    this.Celular = x;
  }

  getProfissional()
  {
    return this.Profissional;
  }
  setProfissional(x: boolean)
  {
    this.Profissional = x;
  }

  getCrp()
  {
    return this.Crp;
  }
  setCrp(x: string)
  {
    this.Crp = x;
  }

  getDataNasc()
  {
    return this.DataNasc;
  }
  setDataNasc(x: string)
  {
    this.DataNasc = x;
  }
  
  getId()
  {
    return this.Id;
  }
  setId(x: number)
  {
    this.Id = x;
  }

  limpaDados()
  {
    this.setId(0);
    this.setNome("");
    this.setEmail("");
    this.setCpf("");
    this.setCrp("");
    this.setProfissional(null);
    this.setDataNasc("");
    this.setCelular("");
  }

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
  public removeDados(todos: boolean = false, nome: string) {
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