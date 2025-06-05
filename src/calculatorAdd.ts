interface Values {
    delimiters:string[];
    numbersToProcess: string;
}

export class Calculator {
    add(numbers: string): number {
        if (!numbers) {
            return 0;
        }

        let {delimiters, numbersToProcess} = getDelimiters(numbers);

        // Sort delimiters by length in descending order
        delimiters.sort((a, b) => b.length - a.length);

        // Replace each delimiter with a comma and any other delimiter.
        delimiters.forEach(delimiter => {
            numbersToProcess = numbersToProcess.split(delimiter).join(',');
        });

        const strings = getStrings(numbersToProcess);
        if(strings.length > 0){
            throw new Error(`Strings are not allowed ${strings.join(',')}`);
        }
        
        const numberArray = getNumbers(numbersToProcess);

        const negativeNumbers = getNegativeNumbers(numberArray);
        if (negativeNumbers.length > 0) {
            throw new Error(`negative numbers not allowed ${negativeNumbers.join(',')}`);
        }

        // Sum all numbers
        return numberArray.reduce((sum, num) => sum + num, 0);
    }
}

const getDelimiters = (numbers:string):Values => {
    let delimiters:string[] = []
    let numbersToProcess = '';
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
            numbersToProcess = numbers.substring(delimiterEnd + 1)
        }

        // Always include '\n' as a delimiter
        if (!delimiters.includes('\n')) {
            delimiters.push('\n');
        }
    return {delimiters, numbersToProcess};
}

// filtering the unwanted strings in the given input.
const getStrings = (numbers:string):string[] =>  {    
    return numbers.split(',').filter((str: string) => Number.isNaN(parseInt(str)));    
} 

// Split by comma and convert to numbers
const getNumbers = (numbers:string): number[] => {
        return numbers
            .split(',')
            .map(num => parseInt(num.trim(), 10))
            .filter(num => !isNaN(num) && num < 1000)
}

// returns a list of negative numbers
const getNegativeNumbers = (numbers:number[]):number[] => {
    return numbers.filter(num => num < 0);
}