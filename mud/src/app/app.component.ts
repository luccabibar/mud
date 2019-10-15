import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ScreenOrientation: ScreenOrientation,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      let funcaoRetorno = (data) => { console.log('Notificações: ' + JSON.stringify(data));};
      window["plugins"].OneSignal.startInit("0fb9baa5-862b-4488-a4f6-8abcb71a1510",
          "465038185208")
          .handleNotificationOpened(funcaoRetorno)
          .endInit();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.ScreenOrientation.lock(this.ScreenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }
}
