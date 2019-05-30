import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-semanal',
  templateUrl: './detalhes-semanal.page.html',
  styleUrls: ['./detalhes-semanal.page.scss'],
})
export class DetalhesSemanalPage implements OnInit {

  myId = null;
  constructor(private activatedRoute: ActivatedRoute) { }

 ngOnInit() {
   this.myId = this.activatedRoute.snapshot.paramMap.get('myid');
 }
}
