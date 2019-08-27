
import { NavController, IonSlides, AlertController, IonInput } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-relatorio-crise',
  templateUrl: './relatorio-crise.page.html',
  styleUrls: ['./relatorio-crise.page.scss'],
})
export class RelatorioCrisePage implements OnInit {

  @ViewChild(IonSlides) IonSlides: IonSlides;

  public conta = 0;
  public contar = 0;
  public conta3 = 0;

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    this.IonSlides.lockSwipes(true);
    document.getElementById("lblTempo").innerHTML = '- de 10 mins';
    document.getElementById("lblGrau").innerHTML = 'Nenhuma';
  }

  antSlide()
  {
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slidePrev();
    this.IonSlides.lockSwipes(true);
    this.conta3--;
    if(this.conta3 == 0)
    {
      document.getElementById("botoes").style.display='none';
      document.getElementById("btnProximo").style.display='unset';
    }
    if(this.conta3 == 2)
    {
      document.getElementById("concluir").style.display='none';
      document.getElementById("botoes").style.display='unset';
    }
  }

  proxSlide()
  {
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slideNext();
    this.IonSlides.lockSwipes(true);
    this.conta3++;
    if(this.conta3 == 3)
    {
      document.getElementById("botoes").style.display='none';
      document.getElementById("concluir").style.display='unset';
    }
  }

  troca()
  {
    this.IonSlides.lockSwipes(false);
    this.IonSlides.slideNext();
    this.IonSlides.lockSwipes(true);
    this.conta3++;
    document.getElementById("btnProximo").style.display='none';
    document.getElementById("botoes").style.display='unset';
  }

  mudaLabel()
  {
    let tempo = (<HTMLInputElement>document.getElementById("tempo")).value;
    if(tempo == "0")
    {
      document.getElementById("lblTempo").innerHTML = '- de 10 mins';
    }
    else if(tempo == "200")
    {
      document.getElementById("lblTempo").innerHTML = '10 - 15 mins';
    }
    else if(tempo == "400")
    {
      document.getElementById("lblTempo").innerHTML = '16 - 30 mins';
    }
    else if(tempo == "600")
    {
      document.getElementById("lblTempo").innerHTML = '31 - 45 mins';
    }
    else if(tempo == "800")
    {
      document.getElementById("lblTempo").innerHTML = '46 - 60 mins';
    }
    else if(tempo == "1000")
    {
      document.getElementById("lblTempo").innerHTML = '+ de 60 mins';
    }
  }

  mudaLabel2()
  {
    let grau = (<HTMLInputElement>document.getElementById("preocupa")).value;
    if(grau == "0")
    {
      document.getElementById("lblGrau").innerHTML = 'Nenhuma';
    }
    else if(grau == "2")
    {
      document.getElementById("lblGrau").innerHTML = 'Leve';
    }
    else if(grau == "4")
    {
      document.getElementById("lblGrau").innerHTML = 'Moderada';
    }
    else if(grau == "6")
    {
      document.getElementById("lblGrau").innerHTML = 'Forte';
    }
    else if(grau == "8")
    {
      document.getElementById("lblGrau").innerHTML = 'Extrema';
    }
  }

  addsitu()
  {
    this.conta++;
    if(this.conta == 1)
    {
    document.getElementById("addsitu").style.display='unset';
    document.getElementById("escolhersitu").style.display='none';
    }
    if(this.conta == 2)
    {
    document.getElementById("escolhersitu").style.display='unset';
    document.getElementById("addsitu").style.display='none';
    this.conta = 0;
    }

  }

  addoutras()
  {
    document.getElementById("outras").style.display='unset';
    document.getElementById("mostram").style.display='none';
  }

  porquem()
  {
    this.contar++;
    if(this.contar==1)
    {
      document.getElementById("acomp").style.display='unset';
    }
    if(this.contar==2)
    {
      document.getElementById("acomp").style.display='none';
      this.contar = 0;
    }
  }

  envRel()
  {

    let casa = (<HTMLInputElement>document.getElementById("0")).value;
    let ambpub = (<HTMLInputElement>document.getElementById("1")).value;
    let escola = (<HTMLInputElement>document.getElementById("2")).value;
    let trabalho = (<HTMLInputElement>document.getElementById("3")).value;
    let transito = (<HTMLInputElement>document.getElementById("4")).value;
    let data_crise = (<HTMLInputElement>document.getElementById("5")).value;
    let duracao_crise = (<HTMLInputElement>document.getElementById("6")).value;
    let acompanhadoSim = (<HTMLInputElement>document.getElementById("7")).value;
    let acompanhadoNao = (<HTMLInputElement>document.getElementById("9")).value;
    let acomp_amigo = (<HTMLInputElement>document.getElementById("10")).value;
    let acomp_familia = (<HTMLInputElement>document.getElementById("11")).value;
    let acomp_desc = (<HTMLInputElement>document.getElementById("12")).value;
    let sint_dif_resp = (<HTMLInputElement>document.getElementById("13")).value;
    let sint_rit_card_acelerado = (<HTMLInputElement>document.getElementById("14")).value;
    let sint_sens_asfixia = (<HTMLInputElement>document.getElementById("15")).value;
    let sint_sudorese = (<HTMLInputElement>document.getElementById("16")).value;
    let sint_trem_abalos = (<HTMLInputElement>document.getElementById("17")).value;
    let sint_nausea_ind = (<HTMLInputElement>document.getElementById("18")).value;
    let sint_dor = (<HTMLInputElement>document.getElementById("19")).value;
    let sint_ond_calor = (<HTMLInputElement>document.getElementById("20")).value;
    let sint_anestesia = (<HTMLInputElement>document.getElementById("21")).value;
    let sint_sens_irrealidade = (<HTMLInputElement>document.getElementById("22")).value;
    let sint_instabilidade = (<HTMLInputElement>document.getElementById("23")).value;
    let sint_medo_morrer = (<HTMLInputElement>document.getElementById("24")).value;
    let sint_medo_perder_controle = (<HTMLInputElement>document.getElementById("25")).value;
    let situacao1 = (<HTMLInputElement>document.getElementById("26")).value;
    let situacao2 = (<HTMLInputElement>document.getElementById("27")).value;
    let situacao3 = (<HTMLInputElement>document.getElementById("28")).value;
    let preocupacao = (<HTMLInputElement>document.getElementById("29")).value;

  }

}





