import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { FireSQL } from 'firesql';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebasebdService {
  fireSQL;
  constructor(private firestore: AngularFirestore) { this.fireSQL = new FireSQL(firebase.firestore(), { includeId: true});}

  criar_Novo() {
    this.firestore.collection('teste').add({Nome:'jose', Idade:17});
  }
  update(){
    this.firestore.doc('teste/' + 'olvuuNFh4jjbLymaAJEv').update({Nome:'jp', Idade:15});
  }
 
  delete() {
    this.firestore.doc('teste/' + 'olvuuNFh4jjbLymaAJEv').delete();
  }

  mostraid(identificador)
  {
    return this.fireSQL.query(`select __name__ as id from teste where Nome='`+identificador+`'`);
  }
}
