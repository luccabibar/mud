import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimelineComponent } from './timeline/timeline.component';



@NgModule({
    declarations: [TimelineComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [TimelineComponent]
})
export class SharedComponentsModule{

}