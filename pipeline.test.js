const mapToPeriod = require('./pipeline').mapToPeriod;

test('should subtract times', () => {
    expect(mapToPeriod(new Date(2000, 0, 10, 5),{hour: 3, minute: 30}, {hour: 4, minute: 30}))
        .toStrictEqual({date: '10.01.2000', times: [{hour: 3, minute: 30}, {hour: 4, minute: 0}, {hour: 4, minute: 30}]});

    expect(mapToPeriod(new Date(2000, 0, 10, 5),{hour: 3, minute: 30}, {hour: 4, minute: 30}))
        .toStrictEqual({date: '10.01.2000', times: [{hour: 3, minute: 30}, {hour: 4, minute: 0}, {hour: 4, minute: 30}]});

    expect(mapToPeriod(new Date(2000, 11, 10, 5),{hour: 3, minute: 30}, {hour: 4, minute: 0}))
        .toStrictEqual({date: '10.12.2000', times: [{hour: 3, minute: 30}, {hour: 4, minute: 0}]});

    expect(mapToPeriod(new Date(2000, 0, 10, 5),{hour: 3, minute: 30}, {hour: 3, minute: 30}))
        .toStrictEqual({date: '10.01.2000', times: [{hour: 3, minute: 30}]})
});
