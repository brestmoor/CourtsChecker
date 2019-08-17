const fetching = require('./fetching');
const parser = require('./parser');

const date = '25.08.2019';

const times = [{hour: 19, minute: 0}];


const isFree = (date, times) => {
    return fetching.getSessId()
        .then(fetching.login)
        .then(cookie => fetching.fetchTable(cookie, date))
        .then(table => table.schedule)
        .then(schedule => times.map(time => parser.isReservedFor(schedule, time.hour, time.minute)))
        .then(reservationStatuses => reservationStatuses.every(status => status === false));
};

const isFreeScheduled = (event, context) => {
    console.log(event.data
        ? Buffer.from(event.data, 'base64').toString() : 'No message received for court checking.')
};

module.exports.isFreeScheduled = isFreeScheduled
