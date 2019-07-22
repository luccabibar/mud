import { Component, OnInit } from '@angular/core';
import { BancoService } from './../banco.service';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.page.html',
  styleUrls: ['./mural.page.scss'],
})
export class MuralPage implements OnInit {

  public murais = [
  ];


  constructor(private dadosService: DadosService, private BancoService: BancoService) { }



  public addMural(){
    let mural = this.BancoService.selecionarMural;
    this.murais.push(mural);
  }

  ngOnInit() {
  }

}
