import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  constructor() { }

  dados = [];

  setDados(nome: string, valor: any)
  {
    if(nome && nome.trim() !== ""){

      return;
    }
    this.dados[nome] = valor;
  }

  getDados(nome: string): any
  {
    return (nome && typeof this.dados[nome] !== "undefined") ? this.dados[nome] : false;  
  }

  Nome = "";
  Cpf = "";
  Email = "";
  Celular = "";
  Profissional = null;
  Crp = "";
  DataNasc = "";
  Id = 0;
  data_relatorioS_I = null;
  data_relatorioS_F = null;

  getData_relatorioS_I()
  {
    return this.data_relatorioS_I;
  }
  setData_relatorioS_I(x: Date)
  {
    this.data_relatorioS_I = x;
  }
  getData_relatorioS_F()
  {
    return this.data_relatorioS_F;
  }
  setData_relatorioS_F(x: Date)
  {
    this.data_relatorioS_F = x;
  }

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


}
