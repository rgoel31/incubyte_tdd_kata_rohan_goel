import { Calculator } from '../src/calculatorAdd';

describe("Calculator", () => {
    let calculator: Calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    it("should return 0 for empty string", () => {
        expect(calculator.add('')).toBe(0);
    });

    it("should return the number for single number input", () => {
        expect(calculator.add('1')).toBe(1);
    });

    it("should return sum of two numbers", () => {
        expect(calculator.add('1,2')).toBe(3);
    });

    it('should handle any amount of numbers', () => {
        expect(calculator.add('1,2,3,4,5')).toBe(15);
    });

    it('should handle new line character between numbers', () => {
        expect(calculator.add('1\n2,3')).toBe(6);
    });

    it('should handle nmultiple new line characters between numbers', () => {
        expect(calculator.add('1\n2\n3')).toBe(6);
    });

    it('should support custom delimiter', () => {
        expect(calculator.add('//;\n1;2')).toBe(3);
    });

    it('should throw exception for negative numbers', () => {
        expect(() => calculator.add('-1,2')).toThrow('negative numbers not allowed -1');
    });

    it('should show all negative numbers in exception message', () => {
        expect(() => calculator.add('-1,2,-3,4,-5')).toThrow('negative numbers not allowed -1,-3,-5');
    });

    it('should ignore values greater than 1000', () => {
        expect(calculator.add('1,2000')).toBe(1);
    });

    it('should ignore values greater than 1000 when passed custom delimiter', () => {
        expect(calculator.add('//;\n1;2000')).toBe(1);
    });

    it('should support multiple delimiters', () => {
        expect(calculator.add('//[;][$]\n1;2$3')).toBe(6);
    });

    it('should support multiple large delimiters', () => {
        expect(calculator.add('//[***][$$$$]\n1***2***3$$$$4***5')).toBe(15);
    });

    it('should support 10 different delimiters of various lengths and types', () => {
        const input =
            '//[a][b][*][abc][xyz][!!][qwerty][longdelimiter][@#][delim]\n' +
            '1a2b3abc4*5xyz6!!7qwerty8longdelimiter9@#10delim11a12!!13qwerty14longdelimiter15';
        expect(
            calculator.add(input)
        ).toBe(1307674368000);
    });

    it('should handle overlapping delimiters correctly', () => {
        const input = '//[a][abc][ab]\n1a2abc3ab4';
        expect(calculator.add(input)).toBe(10);
    });
    //'12,e,343,erer,23'
    it('should handle string values and return the sum', () => {
        expect(() => calculator.add('12,e,343,erer,23')).toThrow("Strings are not allowed e,erer");
    })

    // if custom delimiter is *, then it should muliptly instead of addition
    it('should mulitply numbers', () => {
        expect(calculator.add('//[*]\n2*3')).toBe(6);
    });

    it('should throw error for negative number', () => {
        expect(()=>calculator.add('//[*]\n-1*2')).toThrow('negative numbers not allowed -1');
    });
});