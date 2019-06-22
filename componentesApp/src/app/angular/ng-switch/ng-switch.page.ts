import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-switch',
  templateUrl: './ng-switch.page.html',
  styleUrls: ['./ng-switch.page.scss'],
})
export class NgSwitchPage implements OnInit {

  public tipoUsuario: string = 'usuario';

  constructor() { }

  ngOnInit() { 
  }

}
