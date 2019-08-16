import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-semanal',
  templateUrl: './detalhes-semanal.page.html',
  styleUrls: ['./detalhes-semanal.page.scss'],
})
export class DetalhesSemanalPage implements OnInit {

  icone = null;
    myId = null;
  semanaId = null;
  array;
  
  constructor(private activatedRoute: ActivatedRoute) {
    // if(this.icone="Sono") {
    //   this.icone = 'sono'
    // }else if(this.icone="Alimentacao"){
    //   this.icone = 'alimentacao'

    // }else if(this.icone="Atividade Fisica"){
    //   this.icone = 'atividade'

    // }else if(this.icone="Lazer"){
    //   this.icone = 'lazer'

    // }
    // this.myId = this.activatedRoute.snapshot.paramMap.get('myId');
    // this.semanaId = this.activatedRoute.snapshot.paramMap.get('semanaId');
    // this.icone = this.activatedRoute.snapshot.paramMap.get('icone');
  }

  ngOnInit() {
    this.myId = this.activatedRoute.snapshot.paramMap.get('myId');
    // this.semanaId = this.activatedRoute.snapshot.paramMap.get('semanaId');
    // this.icone = this.activatedRoute.snapshot.paramMap.get('icone');
    this.array = this.myId.split("-");
    // divide o array em
    
    this.icone = this.array[2];
    this.semanaId = this.array[1];
    this.myId = this.array[0];

  }


}
