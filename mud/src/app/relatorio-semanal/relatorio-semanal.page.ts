
import { DadosService } from './../dados.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController, AlertController } from '@ionic/angular';
import { BancoService } from '../banco.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { BoundDirectivePropertyAst } from '@angular/compiler';
import { getElementDepthCount } from '@angular/core/src/render3/state';
import { async, delay } from 'q';
import { validateConfig } from '@angular/router/src/config';
import { IonContent } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-relatorio-semanal',
  templateUrl: './relatorio-semanal.page.html',
  styleUrls: ['./relatorio-semanal.page.scss'],
})

export class RelatorioSemanalPage implements OnInit {
  @ViewChild(IonSlides) IonSlides: IonSlides;
  @ViewChild(IonContent) content: IonContent;
  dummyList:any;
  public slide1form: FormGroup;
  public slide3form: FormGroup;
  public slide4form: FormGroup;

  public cont = 0;
  public cont2 = 0;
  public cont3 = 0;
  public solta = 0;

  constructor(public navCtrl: NavController, private BD: BancoService,public formBuilder: FormBuilder,private AlertController: AlertController, private router: Router) { 
    
    this.slide1form = formBuilder.group({
        qtdCarboidratos: ['' ,  Validators.compose([Validators.required])],
        qtdProteinas: ['' ,  Validators.compose([Validators.required])],
        qtdLaticinios: ['' ,  Validators.compose([Validators.required])],
        qtdVerdFrut: ['' ,  Validators.compose([Validators.required])],
        qtdAgua: ['' ,  Validators.compose([Validators.required])]
    });
    
    this.slide3form = formBuilder.group({
        qtdLazer: ['', Validators.compose([Validators.required])]
    });

    this.slide4form = formBuilder.group({
        horaDormir: ['', Validators.compose([Validators.required])]
    });
  }
  
  ngOnInit() {
    this.IonSlides.lockSwipes(true);
    document.getElementById("lblTemp").innerHTML = '- de 30 mins';
  }

  fezAtvd()
  {
    this.cont++;
    if(this.cont==1)
    {
      document.getElementById("fezatv").style.display='unset';
    }
    if(this.cont==2)
    {
      document.getElementById("fezatv").style.display='none';
      this.cont = 0;
    }
  }

  dedicou()
  {
    this.cont2++;
    if(this.cont2==1)
    {
      document.getElementById("dedico").style.display='unset';
    }
    if(this.cont2==2)
    {
      document.getElementById("dedico").style.display='none';
      this.cont2 = 0;
    }
  }

  despertou()
  {
    this.cont3++;
    if(this.cont3==1)
    {
      document.getElementById("desperto").style.display='unset';
    }
    if(this.cont3==2)
    {
      document.getElementById("desperto").style.display='none';
      this.cont3 = 0;
    }
  }

  duracAtv()
  {
    let temp = (<HTMLInputElement>document.getElementById("temp")).value;
    if(temp == "0")
    {
      document.getElementById("lblTemp").innerHTML = '- de 30 mins';
    }
    else if(temp == "200")
    {
      document.getElementById("lblTemp").innerHTML = '30 - 60 mins';
    }
    else if(temp == "400")
    {
      document.getElementById("lblTemp").innerHTML = '1 - 2 hrs';
    }
    else if(temp == "600")
    {
      document.getElementById("lblTemp").innerHTML = '2 - 3 hrs';
    }
    else if(temp == "800")
    {
      document.getElementById("lblTemp").innerHTML = '+ de 3 hrs';
    }
  }

  maisVzs()
  {
    let pega = (<HTMLInputElement>document.getElementById("mostraVzs")).innerText;
    this.solta = parseInt(pega);
    this.solta++;
    document.getElementById("mostraVzs").innerHTML = this.solta.toString();
  }

  menosVzs()
  {
    let pega2 = (<HTMLInputElement>document.getElementById("mostraVzs")).innerText;
    this.solta = parseInt(pega2);
    if(this.solta == 1)
    {
      document.getElementById("mostraVzs").innerHTML = this.solta.toString();
    }
    else
    {
        this.solta--;
        document.getElementById("mostraVzs").innerHTML = this.solta.toString();
        this.solta = 0;
    } 
  }
 
   async proxSlide1()
  {
    if(this.slide1form.valid)
    {
      this.IonSlides.slideTo(0);
      const alert = await this.AlertController.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos.',
        buttons: ['OK']
      });
      
      await alert.present();
    }
    else
    {
      this.IonSlides.lockSwipes(false);
      this.IonSlides.slideNext();
      this.ScrollToTop();
      this.IonSlides.lockSwipes(true);
    }
  }

  proxSlide2()
  {
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slideNext();
    this.ScrollToTop();
    this.IonSlides.lockSwipes(true);
  }

  async proxSlide3()
  {
    let dedics = (<HTMLInputElement>document.getElementById("dedicous")).checked;
    if(this.slide3form.invalid && dedics == true)
    {
      const alert = await this.AlertController.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos.',
        buttons: ['OK']
      });
      
      await alert.present();
    }
    else
    {
      this.IonSlides.lockSwipes(false);
      this.IonSlides.slideNext();
      this.ScrollToTop();
      this.IonSlides.lockSwipes(true);
    }
  }

  async proxSlide4()
  {
    if(this.slide4form.invalid)
    {
      const alert = await this.AlertController.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos.',
        buttons: ['OK']
      });
      
      await alert.present();
    }
    else
    {
      this.IonSlides.lockSwipes(false);
      this.IonSlides.slideNext();
      this.ScrollToTop();
      this.IonSlides.lockSwipes(true);
    }
  }

  antSlide()
  {
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slidePrev();
    this.ScrollToTop();
    this.IonSlides.lockSwipes(true);
  }
  

  async salva()
  {
    //alimentação
    let carboidratos = (<HTMLInputElement>document.getElementById("carb")).value;
    let proteinas = (<HTMLInputElement>document.getElementById("prot")).value;
    let lacticinios = (<HTMLInputElement>document.getElementById("lac")).value;
    let verdfrut = (<HTMLInputElement>document.getElementById("verfrut")).value;
    let agua = (<HTMLInputElement>document.getElementById("agua")).value;

    //Atividade-Física
    let fez_atv_sim = (<HTMLInputElement>document.getElementById("atv_sim")).value;
    let fez_atv_nao = (<HTMLInputElement>document.getElementById("atv_nao")).value;
    let duracao_atv = (<HTMLInputElement>document.getElementById("atv_temp")).value;
    let intensidade_atv_l = (<HTMLInputElement>document.getElementById("atv_leve")).value;
    let intensidade_atv_m = (<HTMLInputElement>document.getElementById("atv_moderado")).value;
    let intensidade_atv_a = (<HTMLInputElement>document.getElementById("atv_alto")).value;
    
    //Lazer
    let fez_lazer_sim = (<HTMLInputElement>document.getElementById("dedicous")).value;
    let fez_lazer_nao = (<HTMLInputElement>document.getElementById("dedicoun")).value;
    let vezes_Lazer = (<HTMLInputElement>document.getElementById("lazer_vezes")).value;
    let acomp_lazer_sim = (<HTMLInputElement>document.getElementById("lazer_sim")).value;
    let acomp_lazer_nao = (<HTMLInputElement>document.getElementById("lazer_nao")).value;
    

    //Sono
    let horario_dorm = (<HTMLInputElement>document.getElementById("hrDormir")).value;
    let despertou_sim = (<HTMLInputElement>document.getElementById("sono_sim")).value;
    let despertou_nao = (<HTMLInputElement>document.getElementById("sono_nao")).value;
    let vezes_sono = (<HTMLInputElement>document.getElementById("mostraVzs")).value;
    let acordou_precoce_sim = (<HTMLInputElement>document.getElementById("sono_sim2")).value;
    let acordou_precoce_nao = (<HTMLInputElement>document.getElementById("sono_nao2")).value;

    //comentários
    let coment_lazer = (<HTMLInputElement>document.getElementById("comentLazerInput")).value;
    let coment_final = (<HTMLInputElement>document.getElementById("comentFinalInput")).value;



    const alert = await this.AlertController.create({
      header: 'Erro',
      message: carboidratos+"\n"+proteinas+"n"+lacticinios+"\n"+verdfrut+"\n"+agua+"\n"+
      fez_atv_sim+"n"+fez_atv_nao+"\n"+duracao_atv+"\n"+intensidade_atv_l+"\n"+intensidade_atv_m+"\n"+intensidade_atv_a+
      "\n"+fez_lazer_sim+"\n"+fez_lazer_nao+"\n"+vezes_Lazer+"\n"+acomp_lazer_sim+"\n"+acomp_lazer_nao+"\n"+
      horario_dorm+"\n"+despertou_sim+"\n"+despertou_nao+"\n"+vezes_sono+"\n"+acordou_precoce_sim+"\n"+acordou_precoce_nao+
      "\n"+coment_lazer+"\n"+coment_final,
      buttons: ['OK']
    });
    
    await alert.present();

    



    
  }*/
  logScrollStart(){
    console.log("logScrollStart : When Scroll Starts");
  }
 
  logScrolling(){
    console.log("logScrolling : When Scrolling");
  }
 
  logScrollEnd(){
    console.log("logScrollEnd : When Scroll Ends");
  }
 
  ScrollToBottom(){
    this.content.scrollToBottom(1500);
  }
 
  ScrollToTop(){
    this.content.scrollToTop();
  }
 
  
  ScrollToPoint(X,Y){
    this.content.scrollToPoint(X,Y,1500);
  }

  volta()
  {
    this.router.navigateByUrl('/tabs/tabs2');
  }

}

/* Falta: Campo de observação do relatório em geral, campo de observação do tópico de lazer */