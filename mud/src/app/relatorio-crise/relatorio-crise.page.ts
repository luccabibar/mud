
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
    let carboidratos = (<HTMLInputElement>document.getElementById("carb")).value;
    let proteinas = (<HTMLInputElement>document.getElementById("prot")).value;
    let lacticinios = (<HTMLInputElement>document.getElementById("lac")).value;
    let verdfrut = (<HTMLInputElement>document.getElementById("verfrut")).value;
    let agua = (<HTMLInputElement>document.getElementById("agua")).value;
  }

}





