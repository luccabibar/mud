import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Firebase } from '@ionic-native/Firebase';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

const firebase = {
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
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, AngularFireModule.initializeApp(firebase), 
    AngularFirestoreModule,],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ScreenOrientation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
