const parser = require('./parser');
const fs = require('fs');

courts = fs.readFileSync('./testCourts.html', 'UTF-8');
const isReservedFor = parser.isReservedFor;
const minuteDifference = parser.minuteDifference;

test('should tell if court is reserved', () => {

    const times = [
        {hour: 17, minute: 30},
        {hour: 18, minute: 0},
        {hour: 18, minute: 30},
        {hour: 19, minute: 0},
        {hour: 19, minute: 30},
        {hour: 20, minute: 0},
        {hour: 20, minute: 30},
        {hour: 21, minute: 0},
        {hour: 21, minute: 30}
    ];

    times.forEach(time => expect(isReservedFor(courts, time.hour, time.minute)).toBeTruthy())
});

test('should tell when court is not reserved', () => {

    const times =     [
        {hour: 7, minute: 0},
        {hour: 7, minute: 30},
        {hour: 8, minute: 0},
        {hour: 8, minute: 30},
        {hour: 9, minute: 0},
        {hour: 9, minute: 30},
        {hour: 10, minute: 0},
        {hour: 10, minute: 30},
        {hour: 11, minute: 0},
        {hour: 11, minute: 30},
        {hour: 12, minute: 0},
        {hour: 12, minute: 30},
        {hour: 13, minute: 0},
        {hour: 13, minute: 30},
        {hour: 14, minute: 0},
        {hour: 14, minute: 30},
        {hour: 15, minute: 0},
        {hour: 15, minute: 30},
        {hour: 16, minute: 0},
        {hour: 16, minute: 30},
        {hour: 17, minute: 0},
        {hour: 22, minute: 0},
        {hour: 22, minute: 30},
    ];

    times.forEach(time => expect(isReservedFor(courts, time.hour, time.minute)).toBeFalsy())
});


