import { ConfirmaSenha } from './../validators/senhas';
import { CpfValidator } from '../validators/cpf';
import { CelularValidator } from '../validators/celular';
import { BancoService } from './../banco.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BoundDirectivePropertyAst } from '@angular/compiler';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.page.html',
  styleUrls: ['./cadastro-user.page.scss'],
})


export class CadastroUserPage implements OnInit {

  @ViewChild(IonSlides) IonSlides: IonSlides;
  
	public slideOneForm: FormGroup;
  public submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, private BD: BancoService, public formBuilder: FormBuilder) {
    this.slideOneForm = formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.pattern('[ A-Za-zÀ-ú ]*')])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      datanasc : ['', Validators.compose([Validators.required])],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CpfValidator.checkCpf])],
      senha: ['', Validators.required],
      confirmasenha : ['', Validators.required, ConfirmaSenha.checkSenha]
     });

     
   }
  
 /* public slideOneForm:FormGroup = new FormGroup({
    'nome' : new FormControl(null, [Validators.required, Validators.pattern('[ A-Za-zÀ-ú ]*')]),
    'email' : new FormControl(null, [Validators.required, Validators.email]),
    'datanasc' : new FormControl(null, [Validators.required]),
    'celular' : new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CelularValidator.checkCelular]),
    'cpf' : new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CpfValidator.checkCpf]),
    'senha' : new FormControl(null, [Validators.required]),
    'confirmasenha' : new FormControl(null, [Validators.required, ConfirmaSenha.checkSenha])
  })*/

    proxSlide()
    {
      this.IonSlides.lockSwipes(false);
      this.IonSlides.slideNext();
      this.IonSlides.lockSwipes(true);
    }

    save(){
      this.submitAttempt = true;

      if(!this.slideOneForm.valid){
          this.IonSlides.slideTo(0);
      } 
      else {
          this.IonSlides.lockSwipes(false);
          this.IonSlides.slideNext();
          this.IonSlides.lockSwipes(true);
          alert("Sucesso");
      }
    }

  /*
 public Validar(name:string)
  {
    if(name == 'confirmasenha')
    {
      if(this.slideOneForm.controls.confirmasenha.value != this.slideOneForm.controls.senha.value)
        document.getElementById(name).style.outlineColor='#020B04';
      else if(!this.slideOneForm.controls.nome.valid)
        document.getElementById(name).style.backgroundColor='#f53d3d';
    }
  }

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
  this.IonSlides.lockSwipes(true);
}


public sintomas = [
  { val: 'Dificuldade para Respirar', id: 0 },
  { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
  { val: 'Sensações de Asfixia', isChecked: false },
  { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
  { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
  { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
  { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
  { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
  { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
  { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
  { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
  { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
  { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false },
  { val: 'Ritmo Cardíacao Acelerado / Taquicardia', isChecked: false }
];

}
