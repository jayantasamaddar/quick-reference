/* "n" can either be a number or an array of numbers. 
/* Three functions: 
            a) Permutations (Returns all possible permutations: unsorted)
            b) uniquePermutations (Returns only the unique array elements: unsorted)
            c) nextLargest (Returns the next largest number from the permutations)
            d) prevLargest (Returns the prev largest number from the permutations)
            d) largestNumber (Returns the largest number possible)
            e) smallestNumber (Returns the smallest number possible)
*/

permutations = n => {
    const numsArray = Array.isArray(n) ? n : [...n.toString()];
    const combinations = [];
    const swapInPlace = (swapArray, indxA, indxB) => {
        const temp = swapArray[indxA];
        swapArray[indxA] = swapArray[indxB];
        swapArray[indxB] = temp;
    }

    const generate = (length, array) => {
        if(length === 1) return combinations.push(parseInt([...array].join("")));
        
        generate(length - 1, array);

        for(let i = 0; i < length - 1; i++) {
            length % 2 === 0 ? swapInPlace(array, i, length-1) : swapInPlace(array, 0, length-1);
            generate(length - 1, array);
        }
    };

    generate(numsArray.length, [...numsArray]);

    return combinations;
}

uniquePermutations = numsArray => [...new Set(permutations(numsArray))];

const nextLargest = n => {
    const iterations= uniquePermutations(n).sort((a,b)=>a-b);
    return iterations[iterations.indexOf(n) + 1] || -1;
}

const prevLargest= n => {
    const iterations= uniquePermutations(n).sort((a,b)=>a-b);
    return iterations[iterations.indexOf(n) - 1] || -1;
}

const largestNumber = n => uniquePermutations(n).sort((a,b)=>b-a)[0];

const smallestNumber = n => uniquePermutations(n).sort((a,b)=>a-b)[0];

/* Testing */
console.log(permutations(74191553));
console.log(uniquePermutations(74191553));
console.log(nextLargest(74191553));
console.log(prevLargest(74191553));
console.log(largestNumber(74191553));
console.log(smallestNumber(74191553));