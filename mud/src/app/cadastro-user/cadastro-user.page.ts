
import { CpfValidator } from '../validators/cpf';
import { CelularValidator } from '../validators/celular';
import { BancoService } from './../banco.service';
import { Component, OnInit, ViewChild, SystemJsNgModuleLoader } from '@angular/core';
import { NavController, IonSlides, AlertController, IonInput } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { BoundDirectivePropertyAst } from '@angular/compiler';
import { getElementDepthCount } from '@angular/core/src/render3/state';
import { async, delay } from 'q';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.page.html',
  styleUrls: ['./cadastro-user.page.scss'],
})


export class CadastroUserPage implements OnInit {

  @ViewChild(IonSlides) IonSlides: IonSlides;
  @ViewChild('celulari')  celulari: IonInput;
  @ViewChild('cpfi')  cpfi: IonInput;
  celulare: string;
  cpfe: string;
  
  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;
  public slideThreeForm: FormGroup;
  public submitAttempt1: boolean = false;
  public submitAttempt2: boolean = false;
  public submitAttempt3: boolean = false;
  public conta = 0;
  public cont = 0;

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

  constructor(public dadosService: DadosService,public navCtrl: NavController, private BD: BancoService, public formBuilder: FormBuilder, private AlertController: AlertController) {
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
      this.slideThreeForm = formBuilder.group({
        data_primeira_crise : ['', Validators.compose([Validators.required])],
        situ1: ['' ,  Validators.compose([Validators.required, Validators.minLength(1)])],
        cbox : [false, CadastroUserPage.mustBeTruthy]
      });
   }
  


   onSubmit() {
  }

  static mustBeTruthy(c: AbstractControl): { [key: string]: boolean } {
    let rv: { [key: string]: boolean } = {};
    if (!c.value) {
      rv['notChecked'] = true;
    }
    return rv;
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

    addsitu1()
    {
      this.conta++;
      if(this.conta == 1)
      {
      document.getElementById("situacao2").style.display='unset';
      }
      if(this.conta == 2)
      {
      document.getElementById("situacao3").style.display='unset';
      }
      if(this.conta == 3)
      {
      document.getElementById("situacao4").style.display='unset';
      document.getElementById("fab2").style.display='none';
      }

    }

    foca(oque: string)
    {
      if(oque == "cpf")
      {
        this.cpfe = "";
        setTimeout(() => {
        this.cpfi.setFocus();
        }, 400);
      }
      if(oque == "cpfcel")
      {
        this.celulare = "";
        this.cpfe = "";
        setTimeout(() => {
        this.celulari.setFocus();
        }, 400);
      }
      if(oque == "celular")
      {
        this.celulare = "";
        setTimeout(() => {
        this.celulari.setFocus();
        }, 400);
      }
    }

    async save(){
      
      if(this.slideOneForm.invalid){
          this.IonSlides.slideTo(0);
          this.submitAttempt1 = true;
          const alert = await this.AlertController.create({
            header: 'Erro',
            message: 'Por favor, preencha os campos corretamente.',
            buttons: ['OK']
          });
          
          await alert.present();
      }
      else if(this.slideOneForm.valid && this.cont == 0 )
      {
        let celular = (<HTMLInputElement>document.getElementById("3")).value;
        let cpf = (<HTMLInputElement>document.getElementById("4")).value;
        this.BD.selectGenerico("SELECT * FROM usuario WHERE cpf='"+cpf+"';")
        .then(async(response)=>{
          if(response[0].celular == celular){
            const alert = await this.AlertController.create({
              header: 'Erro',
              message: 'CPF e celular já cadastrados anteriormente.',
              buttons: [
                {
                  text: 'OK',
                  handler: () => { this.foca("cpfcel") }
                }
              ],
            });
            
            await alert.present();
          }

          else if(response[0].celular != celular)
          {

              const alert = await this.AlertController.create({
              header: 'Erro',
              message: 'CPF já cadastrado anteriormente.',
              buttons:[
                {
                  text: 'OK',
                  handler: () => { this.foca("cpf") }
                }
              ],
            });
            await alert.present();
          }
          
        })

        .catch(async(response)=>{
          this.BD.selectGenerico("SELECT * FROM usuario WHERE celular='"+celular+"';")
          .then(async(resposta)=>{
            if(resposta[0].cpf == cpf){
              const alert = await this.AlertController.create({
                header: 'Erro',
                message: 'CPF e celular já cadastrados anteriormente.',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => { this.foca("cpfcel") }
                  }
                ],
              });
              
              await alert.present();
            }
            else if(resposta[0].cpf != cpf)
            {

                const alert = await this.AlertController.create({
                header: 'Erro',
                message: 'Celular já cadastrado anteriormente.',
                buttons:[
                  {
                    text: 'OK',
                    handler: () => { this.foca("celular") }
                  }
                ],
              });
              await alert.present();
            }
          })
          .catch(async(resposta)=>{
            this.IonSlides.lockSwipes(false);
            this.IonSlides.slideNext();
            this.IonSlides.lockSwipes(true);
            this.cont++;
           })
          
        })
    }
    else
    {
      if(this.slideTwoForm.invalid){
        this.IonSlides.slideTo(0);
        this.submitAttempt2 = true;
        const alert = await this.AlertController.create({
          header: 'Erro',
          message: 'Por favor, preencha os campos corretamente.',
          buttons: ['OK']
        });
        
        await alert.present();
       }
      else
      {
        this.IonSlides.lockSwipes(false);
        this.IonSlides.slideNext();
        this.IonSlides.lockSwipes(true);
        document.getElementById("butFinal").style.display='unset';
        document.getElementById("butProx").style.display='none';
      }
    }
    
    }

    cadastra()
    {
          if(this.slideThreeForm.invalid){
            this.IonSlides.slideTo(0);
            this.submitAttempt3 = true;
          } 
          
          this.cadUsu1();
          this.delay(3000).then(any=>{
            this.cadUsu2();
          });
          this.delay(3000).then(any=>{
            this.cadUsu3();
          });

  }


  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }


  cadUsu1()
  {
    let nome = (<HTMLInputElement>document.getElementById("0")).value;
    let email = (<HTMLInputElement>document.getElementById("15")).value;
    let dt_nasc = (<HTMLInputElement>document.getElementById("21")).value;
    let celular = (<HTMLInputElement>document.getElementById("3")).value;
    let cpf = (<HTMLInputElement>document.getElementById("4")).value;
    let senha = (<HTMLInputElement>document.getElementById("5")).value;

    this.BD.cadUsu1(nome,cpf,email,celular,senha,dt_nasc)
    .then(async(response)=>{
        const alert = await this.AlertController.create({
          header: 'Confirmação',
          subHeader: 'Sucesso!',
          message: JSON.stringify(response[0].id_usuario),
          buttons: ['OK']
        });
        
        this.dadosService.setId(Number(response[0].id_usuario));

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
  
      await alert.present()
    })


  }
  
  cadUsu2()
  {
    let cont1_nome = (<HTMLInputElement>document.getElementById("6")).value;
    let cont1_tell = (<HTMLInputElement>document.getElementById("7")).value;
    let cont2_nome = (<HTMLInputElement>document.getElementById("8")).value;
    let cont2_tell = (<HTMLInputElement>document.getElementById("9")).value;

    this.BD.cadUsu2(this.dadosService.getId().toString(),cont1_nome,cont1_tell,cont2_nome,cont2_tell)
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

  cadUsu3()
  {
    let intolerancia = (<HTMLInputElement>document.getElementById("10")).value;
    let data_primeira_crise = (<HTMLInputElement>document.getElementById("11")).value;
    let sintomas_crise = (<HTMLInputElement>document.getElementById("12")).value;
    let situacoes_crise = (<HTMLInputElement>document.getElementById("13")).value;


    this.BD.cadUsu3(this.dadosService.getId().toString(),sintomas_crise,data_primeira_crise,situacoes_crise,intolerancia)
    .then(async(response)=>{
        const alert = await this.AlertController.create({
          header: 'Confirmação',
          subHeader: 'Sucesso!',
          message: JSON.stringify(response),
          buttons: [
            {
              text: 'Ok',
              handler: data => {
                this.navCtrl.navigateForward('login-page');
              }
            }
          ]
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
    
ngOnInit() {
  this.IonSlides.lockSwipes(true);
}
}
