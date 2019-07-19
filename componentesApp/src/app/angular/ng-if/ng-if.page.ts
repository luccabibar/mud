import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-if',
  templateUrl: './ng-if.page.html',
  styleUrls: ['./ng-if.page.scss'],
})
export class NgIfPage implements OnInit {

  public administrador:boolean = false;

  public idade: number;

  constructor() { }

  ngOnInit() {
  }

}
 