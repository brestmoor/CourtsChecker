const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);
// let serviceAccount = require('./courtschecks-firebase-adminsdk-ier7j-6796243a95.json');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://courtschecks.firebaseio.com'
// });

class SubscriptionsService {

    constructor() {
        this.db = admin.firestore();
    }

    getNonExpiredSubscriptions() {
        return this.db.collection('subscriptions')
            .where('expired', '==', false)
            .get()
    }
}

module.exports = SubscriptionsService;