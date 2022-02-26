# Heap's Algorithm

Heap's algorithm generates all possible permutations of n objects. It was first proposed by B. R. Heap in 1963. The algorithm minimizes movement: it generates each permutation from the previous one by interchanging a single pair of elements; the other n−2 elements are not disturbed. In a 1977 review of permutation-generating algorithms, Robert Sedgewick concluded that it was at that time the most effective algorithm for generating permutations by computer.

## Solutions and corollaries: 

#### JavaScript
```
permutations = (numsArray) => {
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

uniquePermutations = (numsArray) => [...new Set(permutations(numsArray))].sort((a,b)=>a-b)
```