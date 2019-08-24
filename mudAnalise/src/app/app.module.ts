import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { HttpClientModule } from '@angular/common/http';
import { DadosService } from './servicos/dados.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule, BrowserAnimationsModule, BrowserModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DadosService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
