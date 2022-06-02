const swap = (arr, indx1, indx2) =>
  ([arr[indx1], arr[indx2]] = [arr[indx2], arr[indx1]]);

/* Using C Style for-Loop */
const bubbleSort = array => {
  const arr = array.slice();
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
};

/* Using while-loop */
const bubbleSort2 = array => {
  const arr = array.slice();
  let counter = arr.length;
  while (counter > 0) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) swap(arr, i, i + 1);
    }
    counter--;
  }
  return arr;
};

/* Using recursive Function */
const bubbleSort3 = array => {
  const arr = array.slice();
  const recursiveSort = (arr, i) => {
    if (i === arr.length - 1) return arr;

    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
    i++;
    return recursiveSort(arr, i);
  };
  return recursiveSort(arr, 0);
};

/* Testing */
const Test = require('../../../RapidTest/Test');
const testFunctions = [bubbleSort, bubbleSort2, bubbleSort3];

const dataArray = [
  [62, 15, 24, 82, 43, 52, 112, 74, 96, 101, 31, 123],
  [72, 33, 9, 996, 741, 224, 362, 1201, 42, 112, 233, 112],
];

Test(dataArray, testFunctions);

module.exports = {
  bubbleSort,
};
