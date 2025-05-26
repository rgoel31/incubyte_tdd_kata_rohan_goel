import {Calculator} from '../src/calculatorAdd';

describe("Calculator", () => {
    let calculator: Calculator;

    beforeEach(()=> {
        calculator = new Calculator();
    });

    it("should return 0 for empty string", () => {
        calculator.add('').toBe(0);
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
});