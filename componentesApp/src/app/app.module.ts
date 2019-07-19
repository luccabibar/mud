// Importações padrões do Ionic 4
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Serviço responsavel por enviar e receber dados complexos.
import { PassandoDadosService } from 'src/app/servicos/passando-dados.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    // Importações padrões, usei quebra de linha para melhor visualização
    BrowserModule, IonicModule.forRoot(), AppRoutingModule

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PassandoDadosService // Adiciona o serviço para todas as paginas.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
