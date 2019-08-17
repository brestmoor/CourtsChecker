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

const checkCourtsEventHandler = (event, context) => {
    return isFree(date, times)
};

module.exports.checkCourtsEventHandler = checkCourtsEventHandler;
