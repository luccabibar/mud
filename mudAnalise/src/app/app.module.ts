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

import { Firebase } from '@ionic-native/Firebase';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from 'angularfire2';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const config = {
  apiKey: "AIzaSyDns6l1bdVQVtTNmPpeFVk8LBauDCKKiuk",
    authDomain: "mud-notificacao.firebaseapp.com",
    databaseURL: "https://mud-notificacao.firebaseio.com",
    projectId: "mud-notificacao",
    storageBucket: "",
    messagingSenderId: "465038185208",
    appId: "1:465038185208:web:19b85f7a30ffa2a4"

 }
 
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, AngularFireDatabaseModule,
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
