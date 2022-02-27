const swap = (arr, indx1, indx2) => [arr[indx1], arr[indx2]] = [arr[indx2], arr[indx1]];

/* Method 1 - Using C Style for-loop */
const selectionSort = array => {
    const arr = [...array];
    for(let i = 0; i < arr.length - 1; i++) {
        for(let j = i; j < arr.length - 1; j++) {
            const min = Math.min(arr[j],...arr.slice(j+1,arr.length));
            if(min < arr[j]) swap(arr, j, arr.lastIndexOf(min));
        }
    }
    return arr;
}

/* Testing */
const Test = require("../../../RapidTest/Test");
const testFunctions = [selectionSort];

const dataArray = [
    [62, 15, 24, 82, 43, 52, 112, 74, 96, 101, 31, 123],
    [72, 33, 9, 996, 741, 224, 362, 1201, 42, 112, 233, 112]
];

Test(dataArray, testFunctions);

module.exports = {
    selectionSort
}