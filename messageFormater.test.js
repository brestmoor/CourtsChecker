const messageFormatter = require('./messageFormatter.js');

test('should format message', () => {
   expect(messageFormatter.format({date: '01.02.2000', times: [{hour: 20, minute: 0}]}))
       .toBe("A court is free on 01.02.2000, 20:00 - 20:30")

   expect(messageFormatter.format({date: '01.02.2000', times: [{hour: 19, minute: 0}, {hour: 19, minute: 30}]}))
       .toBe("A court is free on 01.02.2000, 19:00 - 20:00")
});