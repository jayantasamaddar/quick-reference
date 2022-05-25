/**
 * Insertion Sort
 * ---------------
 * In Insertion Sort, the list is virtually split into a sorted and an unsorted part.
 * Values from the unsorted part are PICKED and INSERTED at the correct position in the sorted part.
 *
 * Notes:
 * (i) The outer loop is to progress through the whole list one at a time.
 * (ii) The sorted list is the inner loop, as we will be checking a new array[i] against the sorted list.
 * (iii) To Pick the element at i, i.e. array[i] use Array.prototype.splice(i, 1).
 * (iv) To Insert, use Array.prototype.splice(indexToInsertAt, 0, elementToInsert).
 * (v) Break the inner loop immediately once the insert is complete to ensure, it doesn't re-check.
 *     This is because, the purpose of the inner loop was to complete the insert and once it is done,
 *     the position of the elements in the array will have changed and arr[i] will evaluate to another
 *     element, than the intended element at the start of the loop.
 */

/* Using C-Style for-loop */
const insertionSort = array => {
  const arr = array.slice();
  for (let i = 1; i < arr.length; i++) {
    const sortedArr = arr.slice(0, i);
    for (let j = 0; j < sortedArr.length; j++) {
      if (sortedArr[j] > arr[i]) {
        const pickedEl = arr.splice(i, 1)[0];
        arr.splice(j, 0, pickedEl);
        break;
      }
    }
  }
  return arr;
};

/* Using while loop */
const insertionSort2 = array => {
  const arr = array.slice();
  let i = 1;
  while (i < arr.length) {
    const sortedArr = arr.slice(0, i);
    let j = 0;
    while (j < sortedArr.length) {
      if (sortedArr[j] > arr[i]) {
        const pickedEl = arr.splice(i, 1)[0];
        arr.splice(j, 0, pickedEl);
        break;
      }
      j++;
    }
    i++;
  }
  return arr;
};

/* Using Recursive Function */
const insertionSort3 = array => {
  const recursiveSort = (arr, i) => {
    if (i === arr.length) return arr;
    const sortedArr = arr.slice(0, i);
    for (let j = 0; j < sortedArr.length; j++) {
      if (sortedArr[j] > arr[i]) {
        const pickedEl = arr.splice(i, 1)[0];
        arr.splice(j, 0, pickedEl);
        break;
      }
    }
    return recursiveSort(arr, i + 1);
  };
  return recursiveSort([...array], 0);
};

/* Testing */
const Test = require('../../../RapidTest/Test');
const testFunctions = [insertionSort, insertionSort2, insertionSort3];

const dataArray = [
  [62, 15, 24, 82, 43, 52, 112, 74, 96, 101, 31, 123],
  [72, 33, 9, 996, 741, 224, 362, 1201, 42, 112, 233, 112],
];

Test(dataArray, testFunctions);

module.exports = {
  insertionSort,
};

/**
 * When i=1, j=0, startingArray = [62,15,24,82,43,52,112,74,96,101,31,123], endingArray = [15,62,24,82,43,52,112,74,96,101,31,123]
 * When i=2, j=1, startingArray = [15,62,24,82,43,52,112,74,96,101,31,123], endingArray = [15,24,62,82,43,52,112,74,96,101,31,123]
 * When i=4, j=2, startingArray = [15,24,62,82,43,52,112,74,96,101,31,123], endingArray = [15,24,43,62,82,52,112,74,96,101,31,123]
 * When i=5, j=3, startingArray = [15,24,43,62,82,52,112,74,96,101,31,123], endingArray = [15,24,43,52,62,82,112,74,96,101,31,123]
 * When i=7, j=5, startingArray = [15,24,43,52,62,82,112,74,96,101,31,123], endingArray = [15,24,43,52,62,74,82,112,96,101,31,123]
 * When i=8, j=7, startingArray = [15,24,43,52,62,74,82,112,96,101,31,123], endingArray = [15,24,43,52,62,74,82,96,112,101,31,123]
 * When i=9, j=8, startingArray = [15,24,43,52,62,74,82,96,112,101,31,123], endingArray = [15,24,43,52,62,74,82,96,101,112,31,123]
 * When i=10, j=2, startingArray = [15,24,43,52,62,74,82,96,101,112,31,123], endingArray = [15,24,31,43,52,62,74,82,96,101,112,123]
 */

// const urlParse = url => {
//   const site = url
//     .slice(0, url.indexOf('.com'))
//     .replace(/^https?:\/\//, '')
//     .split('.')
//     .splice(-1)[0];

//   switch (site) {
//     case 'github': {
//       const [, gistId] = url.match(/gist.github.com\/(.*)\.[^.]+$/);
//       return gistId;
//     }
//   }
//   return site;
// };

// console.log(
//   urlParse(
//     'https://gist.github.com/jayantasamaddar/dc2d6321ce32d012da11dfb49ade9a6a.js'
//   )
// );
