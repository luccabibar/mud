import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  
}
