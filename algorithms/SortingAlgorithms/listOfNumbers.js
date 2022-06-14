/* Simple for-Loop, for creating a list of the first n numbers */
const listOfNumbers = (n) => {
    const arr = [];
    for(let i = 0; i < n; i++) {
        arr.push(i)
    }
    return arr;
}
  
console.log({listOfNumbers: listOfNumbers(10)})


/* Recursive Function for creating a list of the first n numbers */
const listOfNumbers2 = (n) => {
    const arr = [];
    const recursion = (i) => {
      if(i === n) return arr;
      arr.push(i);
      i++;
      return recursion(i);
    }
    return recursion(0);
}

console.log({listOfNumbers2: listOfNumbers(10)})

