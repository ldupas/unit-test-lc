const multiply = require('./../src/multiply')

test('should multiply two numbers', () => {
    expect(multiply(2, 2)).toBe(4)
});