import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';
import { CelularValidator } from './validators/celular';

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  private API_URL = 'http://200.145.153.172/mud/API/index.php/'
  constructor(private http: HttpClient) { 

  }
  insertGenerico(sql: string)
  {
    var data = {
      sql: sql,
    };

    let header = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL + 'insertGenerico', data, {headers: header}).toPromise();
  }

  cadUsu1(nome: string, cpf: string, email: string, celular: string, senha: string, data_nasc: string)
  {
    var date=new Date(data_nasc).toDateString();
    var data = {
      nome: nome,
      cpf: cpf,
      email: email,
      celular: celular,
      senha: senha,
      data_nasc: date
    };

    let header = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL + 'cadUsu1', data, {headers: header}).toPromise();
  } 

  cadUsu2(id_usu: string, cont1_nome: string, cont1_tell: string, cont2_nome: string, cont2_tell: string)
  {
    var data = {
      id_usu: id_usu,
      cont1_nome: cont1_nome,
      cont1_tell: cont1_tell,
      cont2_nome: cont2_nome,
      cont2_tell: cont2_tell
    };

    let header = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL + 'cadUsu2', data, {headers: header}).toPromise();
  }


  cadUsu3(usuario_id: string, sintoma_id: string, primeira_crise: string, situacao_sintoma: string, intolerancia: string)
  {
    var date=new Date(primeira_crise).toDateString();
    var data = {
      usuario_id: usuario_id,
      sintoma_id: sintoma_id,
      primeira_crise: date,
      situacao_sintoma: situacao_sintoma,
      intolerancia: intolerancia
    };

    let header = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL + 'cadUsu3', data, {headers: header}).toPromise();
  } 

  selectGenerico(sql: string)
  {
    var data = {
      sql: sql,
    };

    let header = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL + 'selectGenerico', data, {headers: header}).toPromise();
  }

  deleteGenerico(sql: string)
  {
    var data = {
      sql: sql,
    };

    let header = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL + 'deleteGenerico', data, {headers: header}).toPromise();
  }

  updateGenerico(sql: string)
  {
    var data = {
      sql: sql,
    };
    
    let header = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL + 'updateGenerico', data, {headers: header}).toPromise();
  }
  
  mostraUsuarios()
  {
    let header = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL + 'mostraUsuarios', {headers: header}).toPromise();
  }

  verificaSenha(id_usuario: string,senha: string)
  {
    var data = {
      id_usuario: id_usuario,
      senha: senha
    };
    let header = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL + 'verificarSenha',data, {headers: header}).toPromise();
  }

  alteraSenha(id_usuario: string,senha: string)
  {
    var data = {
      id_usuario: id_usuario,
      senha: senha
    };
    let header = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL + 'alteraSenha',data, {headers: header}).toPromise();
  }

  alteraUsuario(id_usuario: string,nome: string,email: string,data_nasc: string,celular: string,cpf: string)
  {
    var date=new Date(data_nasc).toDateString();
    var data = {
      id_usuario: id_usuario,
      nome: nome,
      email: email,
      data_nasc: date,
      celular: celular,
      cpf: cpf,
    };
    let header = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL + 'alteraUsuario',data, {headers: header}).toPromise();
  }

  selecionarMural(id_usuario: number)
  {
    var data = {
      id_usuario: id_usuario
    };
    let header=new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL+'selecionarMurais', data,{headers: header}).toPromise();

  }

  enviarRelatorioSemanal(id_usuario: string,coment_final: string,Data_relatorioS_I: string,Data_relatorioS_F: string,carboidratos: string,proteinas: string,lacticinios: string,verdfrut: string,agua: string,fez_atv: string,duracao_atv: string,intensidade_atv: string,fez_lazer: string,coment_lazer: string,vezes_Lazer: string,acomp_lazer: string,horario_dorm: string,despertou: string,vezes_sono: string,acordou_precoce: string)
  { 
    var dateI=new Date(Data_relatorioS_I).toDateString();
    var dateF=new Date(Data_relatorioS_F).toDateString();
    //var dateSono=new Date(horario_dorm).toDateString();
    var data={ 
    id_usuario : id_usuario,
    coment_final:coment_final,
    Data_relatorioS_I: dateI,
    Data_relatorioS_F: dateF,
    carboidratos: carboidratos,
    proteinas: proteinas,
    lacticinios: lacticinios,
    verdfrut: verdfrut,
    agua: agua,
    fez_atv: fez_atv,
    duracao_atv: duracao_atv,
    intensidade_atv: intensidade_atv,
    fez_lazer: fez_lazer,
    coment_lazer: coment_lazer,
    vezes_Lazer: vezes_Lazer,
    acomp_lazer: acomp_lazer,
    horario_dorm: horario_dorm,
    despertou: despertou,
    vezes_sono:vezes_sono,
    acordou_precoce: acordou_precoce
  };
  let header=new HttpHeaders({'Content-type':'application/json'});
  return this.http.post(this.API_URL+'relatorioSemanal', data,{headers: header}).toPromise();
  }
}
