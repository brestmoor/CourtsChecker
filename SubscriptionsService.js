const admin = require('firebase-admin');
const functions = require('firebase-functions');
const timeUtils = require('./timeUtils.js')

// admin.initializeApp(functions.config().firebase);
let serviceAccount = require('./total-glider-242914-fdee55c675d7.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://total-glider-242914.firebaseio.com'
});

class SubscriptionsService {

    constructor() {
        this.db = admin.firestore();
        this.markAsExpired = this.markAsExpired.bind(this);
        this.getNonExpiredSubscriptions = this.getNonExpiredSubscriptions.bind(this);
    }

    getNonExpiredSubscriptions() {
        return this.db.collection('subscriptions')
            .where('expired', '==', false)
            .where('fromTimeDate', '>=', new Date())
            .get()
    }


    markAsExpired(subscriptionId) {
        return this.db.collection('subscriptions')
            .doc(subscriptionId)
            .set({
                expired: true
            }, {merge: true})
    }
}

module.exports = SubscriptionsService;