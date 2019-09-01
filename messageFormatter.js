const timeUtils = require('./timeUtils.js');

const format = (freeResult) => {
    const times = freeResult.times;
    const fromTime = times[0];
    const toTime = timeUtils.addHalfHour(times[times.length - 1]);
    const date = freeResult.date;

    return `A court is free on ${date}, ${timeUtils.formatTimeReadable(fromTime, ':')} - ${timeUtils.formatTimeReadable(toTime, ':')}`
};

module.exports.format = format;