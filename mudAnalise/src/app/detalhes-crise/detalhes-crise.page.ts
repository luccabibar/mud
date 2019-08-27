import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-crise',
  templateUrl: './detalhes-crise.page.html',
  styleUrls: ['./detalhes-crise.page.scss'],
})
export class DetalhesCrisePage implements OnInit {


  criseId = null;
  tipo=null;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.criseId = params["criseId"];
      this.tipo = params["tipo"];

    });
    console.log("OLAAA",this.criseId)
  }

  ngOnInit() {
    // this.criseId = this.activatedRoute.snapshot.paramMap.get('criseId');
  }

  // public ionViewDidEnter() {
  //   this.criseId = this.activatedRoute.snapshot.paramMap.get('criseId');
  //   console.log(this.criseId);
  // }
}
