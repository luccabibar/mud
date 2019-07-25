import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

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
}