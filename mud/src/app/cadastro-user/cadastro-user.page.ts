
import { CpfValidator } from '../validators/cpf';
import { CelularValidator } from '../validators/celular';
import { BancoService } from './../banco.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BoundDirectivePropertyAst } from '@angular/compiler';
import { getElementDepthCount } from '@angular/core/src/render3/state';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.page.html',
  styleUrls: ['./cadastro-user.page.scss'],
})


export class CadastroUserPage implements OnInit {

  @ViewChild(IonSlides) IonSlides: IonSlides;
  
  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;
  public submitAttempt1: boolean = false;
  public submitAttempt2: boolean = false;

  matchingPasswords(senhaKey: string, confirmasenhaKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let senha = group.controls[senhaKey];
      let confirmasenha= group.controls[confirmasenhaKey];

      if (confirmasenha.value != senha.value) {
        return {
          mismatchedPasswords: true
        };
      }

      return null;
    }
  }

  constructor(public navCtrl: NavController, private BD: BancoService, public formBuilder: FormBuilder, private AlertController: AlertController) {
      this.slideOneForm = formBuilder.group({
      nome: ['' , Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern('[ A-Za-zÀ-ú ]*')])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      datanasc : ['', Validators.compose([Validators.required])],
      celular : ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CelularValidator.checkCelular])],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CpfValidator.checkCpf])],
      senha: ['', Validators.required],
      confirmasenha : ['', Validators.required]}, 
      {validator: this.matchingPasswords('senha', 'confirmasenha')}
      );
      this.slideTwoForm = formBuilder.group({
        nome_contato1: ['' , Validators.compose([Validators.required, Validators.pattern('[ A-Za-zÀ-ú ]*')])],
        num_contato1: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CelularValidator.checkCelular])],
        nome_contato2: ['' , Validators.compose([Validators.pattern('[ A-Za-zÀ-ú ]*')])],
        num_contato2: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+')])]
      });
   }
  
 /* public slideOneForm:FormGroup = new FormGroup({
    'nome' : new FormControl(null, [Validators.required, Validators.minLength(1), Validators.pattern('[ A-Za-zÀ-ú ]*')]),
    'email' : new FormControl(null, [Validators.required, Validators.email]),
    'datanasc' : new FormControl(null, [Validators.required]),
    'celular' : new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CelularValidator.checkCelular]),
    'cpf' : new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]+'), CpfValidator.checkCpf]),
    'senha' : new FormControl(null, [Validators.required, Validators.minLength(2)]),
    'confirmasenha' : new FormControl(null, [Validators.required, Validators.minLength(2), ConfirmaSenha.checkSenha])}, 
    {validator: this.matchingPasswords('senha', 'confirmasenha')}
  })*/

    proxSlide()
    {
      this.IonSlides.lockSwipes(false);
      this.IonSlides.slideNext();
      this.IonSlides.lockSwipes(true);
    }

    addcontato()
    {
      document.getElementById("contato2").style.display='unset';
      document.getElementById("fab").style.display='none';
    }

    save(){

      if(this.slideOneForm.invalid){
          this.IonSlides.slideTo(0);
          this.submitAttempt1 = true;
      } 
      if(this.slideTwoForm.invalid){
        this.IonSlides.slideTo(0);
        this.submitAttempt2 = true;
      } 
      else {
          this.IonSlides.lockSwipes(false);
          this.IonSlides.slideNext();
          this.IonSlides.lockSwipes(true);
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
