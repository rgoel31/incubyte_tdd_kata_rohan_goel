export class Calculator {
    add(numbers: string): number {
        if (!numbers) {
            return 0;
        }

        let delimiters = [',', '\n'];
        let numbersToProcess = numbers;

        // Replace each delimiter with a comma.
        delimiters.forEach(delimiter => {
            numbersToProcess = numbersToProcess.split(delimiter).join(',');
        });

        // Split by comma and convert to numbers
        const numberArray = numbers
            .split(',')
            .map(num => parseInt(num.trim(), 10))

        // Sum all numbers
        return numberArray.reduce((sum, num) => sum + num, 0);
    }
}