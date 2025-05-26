export class Calculator {
    add(numbers: string): number {
      if (!numbers) {
        return 0;
      }

    // Split by comma and convert to numbers
    const numberArray = numbers
      .split(',')
      .map(num => parseInt(num.trim(), 10))

    // Sum all numbers
    return numberArray.reduce((sum, num) => sum + num, 0);
    }
}