import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, IonInput} from '@ionic/angular';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  async Mural()
  {
    this.nav.navigateBack('tabs/mural');
  }
}
