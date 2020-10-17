const firebase = require('firebase');

class SubscriptionsService {

    constructor() {
        this.db = firebase.firestore();
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