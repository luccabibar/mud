import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, Renderer, ViewChild, Input} from '@angular/core';
import { NavController, AlertController, IonInput} from '@ionic/angular';
import {ModalController} from '@ionic/angular';
import {DomSanitizer} from "@angular/platform-browser";
import { ModalansPage } from '../modalans/modalans.page';
import { ModalMindPage } from '../modal-mind/modal-mind.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private nav: NavController, private router: Router,public alertController: AlertController, private modalCrtl: ModalController ) { 
    
  }
  
  async Mural()
  {
    this.nav.navigateBack('tabs/mural');
  }


  async presentAlert8(){
    const alert8 = await this.alertController.create({
      header: "Respiração diafragmática",
      subHeader: "O porque e como fazer...",
      message:'<div class=message><br> A respiração ideal chamada diafragmática é necessária porque expande o diafragma e leva o oxigênio até o abdômen, o corpo e o cérebro.<br> Em casa, na rua, na condução, no trabalho, nos estudos ou no trânsito qualquer pessoa pode fazer a respiração diafragmática, aliviando assim as crises de ansiedade, tensão e stress.<br>A ansiedade generalizada e as crises de pânico também podem ser descaracterizadas e sua intensidade diminuída através da prática de uma respiração diafragmática adequada.<br><br><br>Como fazer uma respiração ideal? <br><br> 1-Coloque-se de forma confortável sentado ou deitado<br> 2- Coloque a mão no abdômen (barriga) próxima ao umbigo <br>3-Feche os olhos e concentre-se em sua respiração <br> 4-Inspire pelo nariz e encha os pulmões de ar, leve-o até o abdômen, percebendo que ele se movimenta. Você pode imaginar que está enchendo uma bexiga que está dentro de sua barriga. Ao inspirar conte até quatro (mentalmente) para que o pulmão e o abdômen fiquem expandidos <br> 5-Retenha o ar por dois tempos (conte até dois mentalmente), mantendo a barriga e os pulmões cheios <br> 6- Expire lentamente pela boca, contando até cinco, esvaziando completamente o pulmão e o abdômen <br> 7-Reinicie os movimentos após reter os pulmões vazios por dois tempos</div>',
      buttons:['OK'],
    });
    await alert8.present();
    
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: "Síndrome do pânico",
      subHeader: "o que é?",
      message:'<div class=message><strong>Sindrome do pânico</strong> - Episódio súbito de medo ou ansiedade intensos e sintomas físicos baseados em uma ameaça imaginária, sem haver perigo iminente. Além disso, as crises são seguidas de preocupação persistente com a possibilidade de ter novos ataques e com as consequências desses ataques, seja dificultando a rotina do dia a dia, seja por medo de perder o controle, enlouquecer ou ter um ataque cardíaco.</div>',
      buttons:['OK'],
    });
    await alert.present();
    
  }
  async presentAlert2(){

    const alert2 = await this.alertController.create({
      header: "Intolerância alimentar",
      subHeader: "o que é?",
      message:'<strong>Intolerância</strong> - Problemas digestivos que ocorrem após a ingestão de determinado alimento. Em caso de uma reação moderada ou grave após a ingestão de um determinado alimento, é preciso consultar um médico, para que se possa determinar se a intolerância ou alergia alimentar é potencialmente fatal.<br><br> <strong>Intolerância ao glúten:</strong><br> pessoas que sofrem desse problema, conhecido como doença celíaca, não podem ingerir glúten. O glúten é uma glicoproteína presente no trigo, aveia, cevada e centeio.<br><br><strong>Intolerância à lactose:</strong><br> as pessoas que sofrem desse problema não podem consumir alimentos que contenham lactose. A lactose é o açúcar encontrado no leite. Este açúcar não pode ser metabolizado pelo sistema digestivo, uma vez que as pessoas intolerantes carecem total ou parcialmente de lactase, que é a enzima que decompõe a lactose.<br><br><strong>Intolerância à frutose:</strong><br>chamamos de frutose o açúcar das frutas, de alguns legumes e do mel. As pessoas intolerantes a esse açúcar não possuem um sistema digestivo capaz de decompor a frutose e de absorvê-la corretamente. Essa deficiência causará problemas digestivos e outras doenças.<strong> Intolerância à sacarose -</strong> A sacarose é o açúcar de mesa comum, as pessoas que sofrem desse tipo de intolerância não são capazes de dissolver essas partículas pela digestão. Os intolerantes ao açúcar não possuem a enzima responsável pela quebra da sacarose em glicose e frutose. Isso causará diferentes problemas de saúde toda vez que ingerido.',
      buttons:['OK'],
    });
    await alert2.present();

  }
  async presentAlert3(){

    const alert3 = await this.alertController.create({
      header: "Qual a importância de se exercitar regularmente?",
      message:' ● Fortalecimento do sistema imunológico;<br>● Melhoria da qualidade do sono;<br>● Redução da gordura corporal e aumento da massa muscular;<br>● Promove o bem-estar e melhoria da autoestima;<br>● Contribui para manter o peso ideal;<br>● Aumento da disposição e resistência física;<br>● Regulação da pressão arterial e do nível de glicose no sangue;<br>● Diminui o estresse;<br>● Melhoria do tônus muscular, força, equilíbrio e flexibilidade;<br>● Fortalecimento dos ossos e articulações;<br>● Melhora no humor;<br>● Auxilia na manutenção da produção hormonal e sanguínea normais;<br>● Diminui os sintomas de ansiedade e depressão;<br>● Melhora disposição e rendimento;<br>',
      buttons:['OK'],
    });
    await alert3.present();

  }
  async presentAlert4(){

    const alert4 = await this.alertController.create({
      header: "Qual a importância de uma boa alimentação?",
      message:' ● Fortalece o sistema imunológico;<br>● Maior capacidade de concentração;<br>● Mais disposição para as atividades diárias;<br>● Prevenção de doenças;<br>● Aumenta a qualidade do sono;<br>● Combate a depressão e o estresse;<br>● Regulação do organismo;<br>● Melhora no humor;<br>● Fornece mais disposição e energia para as atividades diárias; <br>● Diminuição e manutenção do peso; <br>● Possibilita uma vida mais longa com saúde, evitando o envelhecimento precoce;<br>● Permite manter uma aparência saudável; <br>● Melhora o sistema digestivo, permitindo o bom funcionamento do organismo;<br>● Maior capacidade de concentração e raciocínio;<br>● Menor risco de desenvolver doenças crônicas;<br>● Alívio dos sintomas de ansiedade;',
      buttons:['OK'],
    });
    await alert4.present();

  }
  async presentAlert5(){

    const alert5 = await this.alertController.create({
      header: "Qual a importância de uma boa alimentação?",
      message:' ● Fortalece o sistema imunológico;<br>● Maior capacidade de concentração;<br>● Mais disposição para as atividades diárias;<br>● Prevenção de doenças;<br>● Aumenta a qualidade do sono;<br>● Combate a depressão e o estresse;<br>● Regulação do organismo;<br>● Melhora no humor;<br>● Fornece mais disposição e energia para as atividades diárias; <br>● Diminuição e manutenção do peso; <br>● Possibilita uma vida mais longa com saúde, evitando o envelhecimento precoce;<br>● Permite manter uma aparência saudável; <br>● Melhora o sistema digestivo, permitindo o bom funcionamento do organismo;<br>● Maior capacidade de concentração e raciocínio;<br>● Menor risco de desenvolver doenças crônicas;<br>● Alívio dos sintomas de ansiedade;',
      buttons:['OK'],
    });
    await alert5.present();

    } 
     async showModal(){     
       const modal = await this.modalCrtl.create({
         component: ModalansPage
       })
      await modal.present();
  }
  async showModal2(){     
    const modal2 = await this.modalCrtl.create({
      component: ModalMindPage
    })
   await modal2.present();
}

}
