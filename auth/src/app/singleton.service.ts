import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {

  session

  constructor() { 
    this.session = {
      status : 0,
      hash : "",
      idUser : 0
    };

  }
}
