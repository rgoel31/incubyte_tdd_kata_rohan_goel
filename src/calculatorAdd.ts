export class Calculator {
    add(numbers: string): number {
        if (!numbers) {
            return 0;
        }

        let delimiters = [',', '\n'];
        let numbersToProcess = numbers;

        // Check for custom delimiter
        if (numbers.startsWith('//')) {
            const delimiterEnd = numbers.indexOf('\n');
            const delimiterSection = numbers.substring(2, delimiterEnd);
            delimiters.push(delimiterSection);
            numbersToProcess = numbers.substring(delimiterEnd + 1);
        }

        // Replace each delimiter with a comma and any other delimiter.
        delimiters.forEach(delimiter => {
            numbersToProcess = numbersToProcess.split(delimiter).join(',');
        });

        // Split by comma and convert to numbers
        const numberArray = numbersToProcess
            .split(',')
            .map(num => parseInt(num.trim(), 10))

        // Sum all numbers
        return numberArray.reduce((sum, num) => sum + num, 0);
    }
}