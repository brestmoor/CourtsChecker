const cheerio = require('cheerio');
const timeUtils = require('./timeUtils');

const addManyHalfHours = timeUtils.addManyHalfHours;

const isReservedFor = (html, hour, minute) => {
    let badmintonColumn = findBadmintonColumn(html);

    let savedReserved = findSavedReserved(badmintonColumn);
    let blockedReserved = findBlockedReserved(badmintonColumn);

    const allReservations = [...savedReserved, ...blockedReserved];

    const reservationMap = new Map();

    allReservations
        .forEach(time => reservationMap.set(time, (reservationMap.get(time) || 0) + 1));

    let numberOfReservations = reservationMap.get(timeUtils.formatTime({hour: hour, minute: minute}));
    return numberOfReservations >= 5;
};

const findBadmintonColumn = (html) => {
    return cheerio.load(html)('#cl_3_1').wrap('<p/>').parent().html()
};

const findSavedReserved = (html) => {
    const $ = cheerio.load(html);
    let found = $('.saved_reservation_closed')
        .map((idx, el) => {

            let id = $(el).parent().next().attr('id');
            let timeFromBidi = getTimeFromBidi(id);

            let height = $(el).css('height');
            let numberOfCells = getNumberFromPx(height) / 41;

            const reservedTimes = [];

            for (let i = 0; i < numberOfCells; i++) {
                reservedTimes.push(addManyHalfHours(timeFromBidi, i))
            }

            return reservedTimes
        })
        .get();

    return found
        .map(timeUtils.formatTime)
};


const findBlockedReserved = (html) => {
    const $ = cheerio.load(html);
    return $('.reservation_closed').not('.saved_reservation_closed')
        .map((idx, el) => getTimeFromBidi($(el).attr('id')))
        .get()
        .map(timeUtils.formatTime)
};

const getNumberFromPx = (sizePx) => {
    return parseInt(sizePx.split('px')[0])
};

const getTimeFromBidi = (bidi) => {
    let bidiParts = bidi.split('_');
    return {hour: parseInt(bidiParts[4]), minute: parseInt(bidiParts[5])}
};

module.exports.isReservedFor = isReservedFor;