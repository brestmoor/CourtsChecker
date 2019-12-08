const parser = require('./parser');
const fetching = require('./fetching');

class AreFreeChecker {
    areFree(cookie, date, periods) {
        return fetching.fetchTable(cookie, date)
            .then(table => periods.map(period => this.checkSinglePeriod(period, table.schedule)));
    };

    checkSinglePeriod(period, schedule) {
        const isFree = this.isSinglePeriodFree(period, schedule);
        return {
            id: period.id,
            isFree: isFree,
            date: period.date,
            times: period.times,
            subscription: period.subscription
        }
    }

    isSinglePeriodFree(period, schedule) {
        return period.times
            .map(time => parser.isReservedFor(schedule, time.hour, time.minute))
            .every(status => status === false)
    }

}

module.exports = AreFreeChecker;