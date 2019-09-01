const format = require('date-format');

const minuteDifference = (firstTime, secondTime) => {
    return (secondTime.hour - firstTime.hour) * 60 + secondTime.minute - firstTime.minute
};


const addManyHalfHours = (time, number) => {
    if (number === 0) {
        return time;
    } else {
        let newTime = addHalfHour(time);
        return addManyHalfHours(newTime, number - 1)
    }
};

const addHalfHour = (time) => {
    let {hour, minute} = time;
    if (minute === 30) {
        return {hour: hour + 1, minute: 0}
    } else {
        return {hour: hour, minute: 30};
    }
};


const formatTime = (time) => {
    return time.hour + '_' + formatMinute(time.minute)
};

const formatTimeReadable = (time) => {
    return time.hour + ':' + formatMinute(time.minute)
};

const formatMinute = (minute) => {
    return ("0" + minute).slice(-2)
};

const formatDate = (date) => {
    return format.asString('dd.MM.yyyy', date)
};
module.exports.minuteDifference = minuteDifference;
module.exports.addManyHalfHours = addManyHalfHours;
module.exports.addHalfHour = addHalfHour;
module.exports.formatTime = formatTime;
module.exports.formatMinute = formatMinute;
module.exports.formatDate = formatDate;
module.exports.formatTimeReadable = formatTimeReadable;