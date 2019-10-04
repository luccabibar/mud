import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

 export const sendOnFireStoreCreate = functions.firestore
 .document('discounts/{discountId}')
 .onCreate(async snapshot => {

    const notification: admin.messaging.Notification = {
        title: 'New Hugo Available',
        body: "socorrro"
    }; 

    const payload: admin.messaging.Message = {
        notification,
        webpush:{
            notification:{
                vibrate:[200,100,200],
                icon:'https://angularfirebase.com/images/logo.png',
                actions:
                [{
                       action: 'like', 
                       title: 'yaaaaa',
                }]
            }
        },
        topic:"discounts",
    };

    return admin.messaging().send(payload);
 });