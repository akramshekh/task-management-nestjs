function addNumbers(num1, num2) {
    return num1 + num2;
}

describe('Example Test', () => {
    it('equals true', () => {
        expect(true).toEqual(true)
    })
})

describe('addNumbers', () => {
    it('adds two numbers', () => {
        expect(addNumbers(2, 2)).toEqual(4);
    })
})