import { ICrise } from './../interfaces/ICrise';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BancoService } from '../servicos/banco.service';

@Component({
  selector: 'app-detalhes-crise',
  templateUrl: './detalhes-crise.page.html',
  styleUrls: ['./detalhes-crise.page.scss'],
})
export class DetalhesCrisePage implements OnInit {


  public crises: ICrise;


  info = null;
  array = null;
  existe = 1;

  // param VARs
  criseId = null;
  tipo = null;
  constructor(private activatedRoute: ActivatedRoute, public bd: BancoService) {

    this.info = this.activatedRoute.snapshot.params.info;
    this.array = this.info.split("-");
    this.array[2];
    this.tipo = this.array[1];
    this.criseId = this.array[0];
    console.log(this.criseId);
    console.log(this.tipo);
    try {
      this.pegaCrise()
    } catch (error) {
      console.log("error");
    }

  }

  ngOnInit() {
    try {
      this.pegaCrise()
    } catch (error) {
      console.log("error");
    }
    this.info = this.activatedRoute.snapshot.params.info;
    this.array = this.info.split("-");
    this.array[2];
    this.tipo = this.array[1];
    this.criseId = this.array[0];
  }

  public async pegaCrise() {
    this.bd.selectGenerico("SELECT * FROM crise WHERE id_crise=" + this.criseId + " ;").then(async (resposta) => {
      console.log("Crises:", resposta)
      this.crises = resposta[0];

      this.existe = 0;
    }).catch(async (resposta) => {
      console.log(resposta);
      this.existe = 2;
    })
  }
  // public ionViewDidEnter() {
  //   this.criseId = this.activatedRoute.snapshot.paramMap.get('criseId');
  //   console.log(this.criseId);
  // }
}
