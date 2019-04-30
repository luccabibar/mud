import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  private API_URL = 'http://200.145.153.172/mud/API/'
  constructor(private http: HttpClient) { 

  }
  createAccount(nome: string, idade: number) {
      var data = {
        nome: nome,
        idade: idade
      };
      
      let header = new HttpHeaders({'Content-type':'application/json'});
      return this.http.post(this.API_URL + 'insere.php', data, {headers: header}).toPromise();

    
  }
 
  mostra(){
    let header = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.API_URL + 'api.php', {headers: header}).toPromise();
  }
  

  
}
