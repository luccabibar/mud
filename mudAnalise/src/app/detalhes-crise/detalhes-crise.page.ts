import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-crise',
  templateUrl: './detalhes-crise.page.html',
  styleUrls: ['./detalhes-crise.page.scss'],
})
export class DetalhesCrisePage implements OnInit {

 
  criseId
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.criseId = this.activatedRoute.snapshot.paramMap.get('criseId');
  }

  public ionViewDidEnter() {
    this.criseId = this.activatedRoute.snapshot.paramMap.get('criseId');

  }
}
