import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-semanal',
  templateUrl: './detalhes-semanal.page.html',
  styleUrls: ['./detalhes-semanal.page.scss'],
})
export class DetalhesSemanalPage implements OnInit {

  icone;
  myId = null;
  constructor(private activatedRoute: ActivatedRoute) {
    // if() {
    //   this.icone = 'sono'
    // }else if(){
    //   this.icone = 'alimentacao'

    // }else if(){
    //   this.icone = 'atividade'

    // }else if(){
    //   this.icone = 'lazer'

    // }

  }

  ngOnInit() {
    // this.myId = this.activatedRoute.snapshot.paramMap.get('myId');
  }


}
