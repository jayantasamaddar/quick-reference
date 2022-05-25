/**
 * I. Merge Sort Methods
 * There are two merge sort methods.
 * - "Two-way Merge Sort" is an iterative procedure, that involves loops
 * - "Merge Sort" is a Recursive procedure
 *
 * II. Merge Sort Procedure
 * Given: Unsorted array, [35, 44, 59, 99, 101, 7, 62, 79, 99, 142]. To sort using Merge Sort
 *
 * (i) We will assume that each element of the array is a list having one element.
 * A single element means, the list is already sorted.
 * (ii) Thus, as per the given example 10 Lists have to be merged into a single sorted list.
 * (iii) We will use the Two-way merge method to sort the lists into a single sorted list.
 */

/********************************************************************************/
/* Merge Function */
/********************************************************************************/
const merge = (arr1, arr2) => {
  let i = 0;
  let j = 0;
  let k = 0;

  const mergedList = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) mergedList[k++] = arr1[i++];
    else mergedList[k++] = arr2[j++];
  }
  for (i; i < arr1.length; i++) mergedList[k++] = arr1[i];

  for (j; j < arr2.length; j++) mergedList[k++] = arr2[j];

  return mergedList;
};

/********************************************************************************/
/* Merge Sort - Divide and Conquer (Method 1) */
/********************************************************************************/

const mergeSortDAC = array => {
  const sortedList = [];
  const splitArr = arr => {
    if (arr.length <= 1) {
      sortedList[0] = merge(arr, sortedList[sortedList.length - 1] ?? []);
      return sortedList[0];
    }
    const midIndx = Math.floor(arr.length / 2);
    splitArr(arr.slice(0, midIndx));
    splitArr(arr.slice(midIndx));
  };
  splitArr([...array]);
  return sortedList[0];
};

/********************************************************************************/
/* Merge Sort - Divide and Conquer (Method 2) */
/********************************************************************************/

const mergeSortDAC2 = array => {
  const recursiveSort = arr => {
    if (arr.length <= 1) {
      return arr;
    }
    const midIndx = Math.floor(arr.length / 2);
    const arr1 = arr.slice(0, midIndx);
    const arr2 = arr.slice(midIndx);

    return merge(mergeSortDAC2(arr1), mergeSortDAC2(arr2));
  };
  return recursiveSort([...array]);
};

/********************************************************************************/
/* Merge Sort */
/********************************************************************************/
const mergeSort = array => {
  const arr = array.map(e => [e]);
  const recursiveSort = arr => {
    if (arr.length === 1) return arr[0];
    const sortedList = [];
    let i = 0;
    while (i < arr.length) {
      sortedList.push(merge(arr[i], arr[i + 1] ?? []));
      i += 2;
    }
    return recursiveSort(sortedList);
  };

  return recursiveSort(arr);
};

/*************************************/
/* Testing */
/*************************************/
const Test = require('../../../RapidTest/Test');
const testFunctions = [mergeSort, mergeSortDAC, mergeSortDAC2];

const dataArray = [[35, 44, 59, 99, 101, 7, 62, 79, 99, 142]];

Test(dataArray, testFunctions);
