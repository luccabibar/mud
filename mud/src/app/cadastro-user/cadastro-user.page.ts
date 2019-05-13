import { BancoService } from './../banco.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BoundDirectivePropertyAst } from '@angular/compiler';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.page.html',
  styleUrls: ['./cadastro-user.page.scss'],
})

export class CadastroUserPage implements OnInit {

  constructor(public navCtrl: NavController,private BD: BancoService) { }
  /*public dadosUser: FormGroup = new FormGroup({
    'nome' : new FormControl(null, [Validators.required, Validators.minLength(2)]),
    'email' : new FormControl(null, [Validators.required, Validators.minLength(2)]),
    'datanasc' : new FormControl(null, [Validators.required, Validators.minLength(2)]),
    'tel' : new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    'cpf' : new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    'senha' : new FormControl(null, [Validators.required, Validators.minLength(2)])
  })



  
  
  inserirUsuario()
  {
    let nome = (<HTMLInputElement>document.getElementById("0")).value;
    let email = (<HTMLInputElement>document.getElementById("1")).value;
    let datanasc = (<HTMLIonDatetimeElement>document.getElementById("2")).value;
    let celular = (<HTMLInputElement>document.getElementById("3")).value;
    let cpf = (<HTMLInputElement>document.getElementById("4")).value;
    let senha = (<HTMLInputElement>document.getElementById("5")).value;
    let sql = "INSERT INTO usuario (id_usuario, nome)"
    this.BD.selectGenerico(sql);

}*/
ngOnInit() {
}
}
