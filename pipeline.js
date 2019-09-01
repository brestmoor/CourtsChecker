const webpush = require('web-push');
const fetching = require('./fetching');
const parser = require('./parser');
const timeUtils = require('./timeUtils');
const messageFormatter = require('./messageFormatter.js');
const SubscriptionsService = require('./SubscriptionsService');

const vapidKeys = {
    publicKey:
        'BI8Y24asVcd06UeNYsQAoyUe20kvpxFEFt3VkOYSA7GwpTSR1LrHUi4RuwTJQEwIszq7CFi7Dqza7NemQM8Gz4c',
    privateKey: 'PIbb58UQtavg_S7D5wqG5PoXBsCIBH1svgU3anzY7_o'
};

webpush.setVapidDetails(
    'mailto:caramelpanel@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const logIn = () => {
    return fetching.getSessId()
        .then(fetching.login)
};

const isFree = (cookie, period) => {
    console.log("checking for: " + JSON.stringify(period) + "\n\n");
    return fetching.fetchTable(cookie, period.date)
        .then(table => table.schedule)
        .then(schedule => period.times.map(time => parser.isReservedFor(schedule, time.hour, time.minute)))
        .then(reservationStatuses => ({
            isFree: reservationStatuses.every(status => status === false),
            date: period.date,
            times: period.times,
            subscription: period.subscription
        }));
};

const mapToPeriod = (subscription) => {
    const date = subscription.data().date.toDate();
    const fromTime = subscription.data().fromTime;
    const toTime = subscription.data().toTime;

    const minuteDifference = timeUtils.minuteDifference(fromTime, toTime);
    const halves = minuteDifference / 30;

    const times = [fromTime];

    for (let i = 1; i <= halves - 1; i++) {
        times.push(timeUtils.addManyHalfHours(fromTime, i))
    }

    return {date: timeUtils.formatDate(date), times: times, subscription: subscription.data().subscription}
};

const checkCourtsEventHandler = (event, context) => {
    return new SubscriptionsService().getNonExpiredSubscriptions()
        .then(subscriptions => subscriptions.docs.map(sub => mapToPeriod(sub)))
        .then(periods => logIn().then(cookie => periods.map(period => isFree(cookie, period))))
        .then(areFreePromises => Promise.all(areFreePromises))
        .then(checkResults => checkResults.filter(checkResult => checkResult.isFree))
        .then(freeResults => freeResults.map(freeResult => webpush.sendNotification(freeResult.subscription, messageFormatter.format(freeResult))))
        .then(sentNotification => sentNotification.then(console.log).catch(console.log))
        .catch(console.log)
};

module.exports.checkCourtsEventHandler = checkCourtsEventHandler;
module.exports.mapToPeriod = mapToPeriod;


checkCourtsEventHandler()
    .then(console.log)
    .catch(console.log);
