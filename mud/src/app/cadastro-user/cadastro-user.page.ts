import { ConfirmaSenha } from './../validators/senhas';
import { CpfValidator } from '../validators/cpf';
import { CelularValidator } from '../validators/celular';
import { BancoService } from './../banco.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BoundDirectivePropertyAst } from '@angular/compiler';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.page.html',
  styleUrls: ['./cadastro-user.page.scss'],
})


export class CadastroUserPage implements OnInit {

  @ViewChild(IonSlides) IonSlides: IonSlides;
  
	/*public slideOneForm: FormGroup;*/
  public submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, private BD: BancoService, public formBuilder: FormBuilder, private AlertController: AlertController) {
    /*this.slideOneForm = formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern('[ A-Za-zÀ-ú ]*')])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CpfValidator.checkCpf])]
     });*/

     
   }
  
  public slideOneForm:FormGroup = new FormGroup({
    'nome' : new FormControl(null, [Validators.required, Validators.minLength(1), Validators.pattern('[ A-Za-zÀ-ú ]*')]),
    'email' : new FormControl(null, [Validators.required, Validators.email]),
    'datanasc' : new FormControl(null, [Validators.required]),
    'celular' : new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CelularValidator.checkCelular]),
    'cpf' : new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CpfValidator.checkCpf]),
    'senha' : new FormControl(null, [Validators.required, Validators.minLength(2)]),
    'confirmasenha' : new FormControl(null, [Validators.required, Validators.minLength(2), ConfirmaSenha.checkSenha])
  })

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

    cadastra()
    {
      let nome = (<HTMLInputElement>document.getElementById("0")).value;
      let email = (<HTMLInputElement>document.getElementById("1")).value;
      let dt_nasc = (<HTMLInputElement>document.getElementById("2")).value;
      let celular = (<HTMLInputElement>document.getElementById("3")).value;
      let cpf = (<HTMLInputElement>document.getElementById("4")).value;
      let senha = (<HTMLInputElement>document.getElementById("5")).value;

      let cont1_nome = (<HTMLInputElement>document.getElementById("6")).value;
      let cont1_tell = (<HTMLInputElement>document.getElementById("7")).value;
      let cont2_nome = (<HTMLInputElement>document.getElementById("8")).value;
      let cont3_nome = (<HTMLInputElement>document.getElementById("9")).value;

      this.BD.insertGenerico("INSERT INTO usuario(nome,email,data_nasc,cpf,celular,senha,data_primeira_crise,sintoma,situacoes_sintoma) VALUES('"+nome+"','"+email+"','"+dt_nasc+"','"+cpf+"','"+celular+"','','','','','');")
    .then(async(response)=>{
        const alert = await this.AlertController.create({
          header: 'Confirmação',
          subHeader: 'Sucesso!',
          message: JSON.stringify(response),
          buttons: ['OK']
        });
        
        await alert.present();
      }
    )
    .catch(async(response)=>{

      const alert = await this.AlertController.create({
        header: 'Confirmação',
        subHeader: 'Erro!',
        message: JSON.stringify(response),
        buttons: ['OK']
      });
  
      await alert.present();
    })

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
