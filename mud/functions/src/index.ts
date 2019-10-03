import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/* export const sendOnFireStoreCreate = functions.firestore
 .document('discounts/{discountId}')
 .onCreate(async snapshot => {
    const discount = snapshot.data();

    const notification: admin.messaging.Notification = {
        title: 'New Hugo Available',
        body: discount.headline
    }; 

    const payload: admin.messaging.Message = {
        notification,
        topic: 'discounts'
    };
    return admin.messaging().send(payload);
 });*/