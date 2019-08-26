import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ModalansPage } from '../modalans/modalans.page';
import { modalController } from '@ionic/core';
import { ModalMindPage } from '../modal-mind/modal-mind.page';
import { ModalMindPageModule } from '../modal-mind/modal-mind.module';
import { ModalansPageModule } from '../modalans/modalans.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page, ModalansPage, ModalMindPage],
  entryComponents: [ModalansPage, ModalMindPage]
})
export class Tab3PageModule {}
