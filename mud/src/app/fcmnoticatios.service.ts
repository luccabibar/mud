
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseMessaging } from 'angularfire2';
@Injectable({
  providedIn: 'root'
})
export class FcmnoticatiosService {

  constructor(
    public firebaseNative = Firebase,
    public afs: AngularFirestore,
    private platform: Platform
  ) {}
    // Get permission from the user
    async getToken() { }

    // Save the token to firestore
    private saveTokenToFirestore(token) {}
  
    // Listen to incoming FCM messages
    listenToNotifications() {}
  
}
