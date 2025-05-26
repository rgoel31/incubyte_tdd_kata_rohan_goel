import {Calculator} from '../src/calculatorAdd';

describe("Calculator", () => {
    let calculator: Calculator;

    beforeEach(()=> {
        calculator = new Calculator();
    });

    it("should return 0 for empty string", () => {
        calculator.add('').toBe(0);
    });
});