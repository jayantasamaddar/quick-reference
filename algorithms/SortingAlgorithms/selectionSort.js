const swap = (arr, indx1, indx2) =>
  ([arr[indx1], arr[indx2]] = [arr[indx2], arr[indx1]]);

/* Method 1 - Using C Style for-loop */
const selectionSort = array => {
  const arr = array.slice();
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i; j < arr.length - 1; j++) {
      const select = Math.min(...arr.slice(j, arr.length));
      if (select < arr[j]) swap(arr, j, arr.lastIndexOf(select));
    }
  }
  return arr;
};

/* Method 2 - Using for-in loop */
const selectionSort2 = array => {
  const arr = array.slice();
  for (let c in arr) {
    for (let i = c; i < arr.length - 1; i++) {
      const select = Math.min(arr[i], ...arr.slice(i + 1, array.length));
      if (select < arr[i]) swap(arr, i, arr.lastIndexOf(select));
    }
  }
  return arr;
};

/* Method 3 - Using while loop */
const selectionSort3 = array => {
  const arr = array.slice();
  let i = 0;
  while (i < arr.length - 1) {
    let j = i;
    while (j < arr.length - 1) {
      const select = Math.min(arr[i], ...arr.slice(i + 1, array.length));
      if (select < arr[i]) swap(arr, i, arr.lastIndexOf(select));
      j++;
    }
    i++;
  }
  return arr;
};

/* Method 4 - Using Recursive Function */
const selectionSort4 = array => {
  const recursiveSort = (arr, indx) => {
    let i = indx;
    if (i === arr.length - 1) return arr;
    for (let j = i; j < arr.length - 1; j++) {
      const select = Math.min(arr[j], ...arr.slice(j + 1, arr.length));
      if (select < arr[j]) swap(arr, j, arr.lastIndexOf(select));
    }
    i++;
    return recursiveSort(arr, i);
  };
  return recursiveSort([...array], 0);
};

/* Testing */
const Test = require('../../../RapidTest/Test');
const testFunctions = [
  selectionSort,
  selectionSort2,
  selectionSort3,
  selectionSort4,
];

const dataArray = [
  [62, 15, 24, 82, 43, 52, 112, 74, 96, 101, 31, 123],
  [72, 33, 9, 996, 741, 224, 362, 1201, 42, 112, 233, 112],
];

Test(dataArray, testFunctions);

module.exports = {
  selectionSort,
};
