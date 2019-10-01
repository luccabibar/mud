import { GraficoCrisePage } from './../opcoes-menu/grafico-crise/grafico-crise.page';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  private API_URL = 'http://200.145.153.172/mud/API/index.php/'
  constructor(private http: HttpClient) {

  }
/**
 * Efetua criacao de nova sessao
 * @param hash 
 * @param profissional_id 
 */
  inserirSessao(hash: string, profissional_id: number)
  {
      var data={
        hash: hash,
        profissional_id: profissional_id,
      }

      let header = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL + 'inserirSessao', data, {headers: header}).toPromise();
  }

  /**
   * Cria novo mural na tab3
   * @param titulo 
   * @param texto 
   * @param id 
   * @param id_prof 
   */
  inserirMural(titulo: string, texto: string, id: number, id_prof: number)
  {
    var data={
      titulo: titulo,
      texto: texto,
      id: id,
      id_prof: id_prof,
    }

    let header = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL + 'inserirMural', data, {headers: header}).toPromise();
  }

  /**
   * Carrega os dados do mural do profissional
   * @param id_usuario 
   * @param id_prof 
   */
  selecionarMuralProf(id_usuario: number, id_prof:number)
  {
    var data = {
      id_usuario: id_usuario,
      id_prof:id_prof
    };
    let header=new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL+'selecionarMuraisProf', data,{headers: header}).toPromise();

  }

  /**
   * Apaga um determinado mural escolhido pelo profissional
   * @param id_usuario 
   * @param id_prof 
   * @param id_mural 
   */
  deletarMural(id_usuario: number, id_prof:number, id_mural:number)
  {
    var data = {
      id_usuario: id_usuario,
      id_prof:id_prof,
      id_mural: id_mural
    };
    let header=new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL+'deletarMural', data,{headers: header}).toPromise();
  }

  /**
   * Insert SQL
   * @param sql 
   */
  insertGenerico(sql: string) {
    var data = {
      sql: sql,
    };

    let header = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.API_URL + 'insertGenerico', data, { headers: header }).toPromise();
  }

  /**
   * Select SQL
   * @param sql 
   */
  selectGenerico(sql: string) {
    var data = {
      sql: sql,
    };

    let header = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.API_URL + 'selectGenerico', data, { headers: header }).toPromise();
  }

  /**
   * Metodo que invoca na API o recuperarSenha
   * @param sql 
   */
  esqueciSenha(sql: string) {
    var data = {
      sql: sql,
    };

    let header = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.API_URL + 'recuperarSenha', data, { headers: header }).toPromise();
  }

  /**
   * Comando delete SQL
   * @param sql 
   */
  deleteGenerico(sql: string) {
    var data = {
      sql: sql,
    };

    let header = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.API_URL + 'deleteGenerico', data, { headers: header }).toPromise();
  }

  /**
   * Comando Update SQL
   * @param sql 
   */
  updateGenerico(sql: string) {
    var data = {
      sql: sql,
    };

    let header = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.API_URL + 'updateGenerico', data, { headers: header }).toPromise();
  }

  /**
   * Pega os usuarios
   */
  mostraUsuarios() {
    let header = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.API_URL + 'mostraUsuarios', { headers: header }).toPromise();
  }
/**
 * Recebe objeto preenchido e efetua cadastro do profissional
 * @param obj 
 */
  cadProf(obj) {
    var data = {
      nome: obj.nome,
      cpf: obj.cpf,
      email: obj.email,
      data_nasc: obj.dt_nasc,
      celular: obj.celular,
      profissional: obj.profissional,
      crp: obj.crp,
      senha: obj.senha,
    };

    console.log(obj.dt_nasc)

    let header = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.API_URL + 'cadProf', data, { headers: header }).toPromise();
  }

}
