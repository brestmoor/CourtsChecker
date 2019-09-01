const minuteDifference = require('./timeUtils').minuteDifference;

test('should subtract times', () => {
    expect(minuteDifference({hour: 22, minute: 0}, {hour: 22, minute: 30})).toBe(30);
    expect(minuteDifference({hour: 17, minute: 15}, {hour: 18, minute: 0})).toBe(45);
    expect(minuteDifference({hour: 0, minute: 0}, {hour: 2, minute: 0})).toBe(120);
    expect(minuteDifference({hour: 3, minute: 0}, {hour: 2, minute: 0})).toBe(-60);
    expect(minuteDifference({hour: 3, minute: 30}, {hour: 4, minute: 30})).toBe(60)
});
