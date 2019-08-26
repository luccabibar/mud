import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-grafico-crise',
  templateUrl: './grafico-crise.page.html',
  styleUrls: ['./grafico-crise.page.scss'],
})
export class GraficoCrisePage implements OnInit {

  data = [
    {
      'name': 'Jan',
      'value': 31
    },
    {
      'name': 'Feb',
      'value': 19
    },
    {
      'name': 'Mar',
      'value': 21
    },
    {
      'name': 'Abr',
      'value': 20
    },
    {
      'name': 'Mai',
      'value': 56
    },
    {
      'name': 'Jun',
      'value': 24
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
