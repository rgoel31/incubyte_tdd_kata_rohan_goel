export class Calculator {
    add(numbers: string): number {
        if (!numbers) {
            return 0;
        }

        let delimiters = [','];
        let numbersToProcess = numbers;

        // Check for custom delimiter
        if (numbers.startsWith('//')) {
            const delimiterEnd = numbers.indexOf('\n');
            const delimiterSection = numbers.substring(2, delimiterEnd);
            // Handle multiple delimiters
            if (delimiterSection.includes('[')) {
                delimiters = delimiterSection.match(/\[(.*?)\]/g)?.map(d => d.slice(1, -1)) || [];
            } else {
                delimiters = [delimiterSection];
            }
            numbersToProcess = numbers.substring(delimiterEnd + 1);
        }

        // Always include '\n' as a delimiter
        if (!delimiters.includes('\n')) {
            delimiters.push('\n');
        }

        // Sort delimiters by length in descending order
        delimiters.sort((a, b) => b.length - a.length);

        // Replace each delimiter with a comma and any other delimiter.
        delimiters.forEach(delimiter => {
            numbersToProcess = numbersToProcess.split(delimiter).join(',');
        });

        // Split by comma and convert to numbers
        const numberArray = numbersToProcess
            .split(',')
            .map(num => parseInt(num.trim(), 10))
            .filter(num => !isNaN(num) && num <= 1000);

        // Check for negative numbers
        const negativeNumbers = numberArray.filter(num => num < 0);
        if (negativeNumbers.length > 0) {
            throw new Error(`negative numbers not allowed ${negativeNumbers.join(',')}`);
        }

        // Sum all numbers
        return numberArray.reduce((sum, num) => sum + num, 0);
    }
}