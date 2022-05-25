/**
 * QuickSort
 * ---------
 * Quick Sort is an algorithm that follows the Divide and Conquer paradigm.
 * It works on the following principles (considering the sorting is done in ascending order) :-
 *
 * (i) An element of an unsorted list is in it's sorted position, if,
 * all the elements to the left are smaller and all the elements to the right are larger than the element.
 * (ii) Assume a pivot element. It can be the first element, the last element or the median element.
 * (iii) Find elements which are greater than the current pivot element in the list to the Left.
 * (iv) Find elements which are lesser than the current pivot element in the list to the Right.
 * (v) Recursively run the quickSort function for the leftArray and the rightArray to sort those lists.
 * (vi) Return [...leftArray, pivot, rightArray] keeping in mind (v)
 */

/********************************************************************************/
/* Quick Sort - Method I - Assuming the first element to be the pivot */
/********************************************************************************/
const quickSort = array => {
  const recursiveSort = (arr, i) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[i];
    let j = 0;
    const leftArr = [];
    const rightArr = [];

    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > pivot) rightArr.push(arr[j]);
      else if (arr[j] <= pivot && j !== i) leftArr.push(arr[j]);
    }
    return [...recursiveSort(leftArr, 0), pivot, ...recursiveSort(rightArr, 0)];
  };

  return recursiveSort([...array], 0);
};

/********************************************************************************/
/* Quick Sort - Method II - Assuming the last element to be the pivot */
/********************************************************************************/
const quickSort2 = array => {
  const recursiveSort = (arr, i) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[i];
    const leftArr = [];
    const rightArr = [];

    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > pivot) rightArr.push(arr[j]);
      else if (arr[j] <= pivot && j !== i) leftArr.push(arr[j]);
    }
    return [
      ...recursiveSort(leftArr, leftArr.length - 1),
      pivot,
      ...recursiveSort(rightArr, rightArr.length - 1),
    ];
  };

  return recursiveSort([...array], array.length - 1);
};

/********************************************************************************/
/* Quick Sort - Method III - Assuming the median element to be the pivot */
/********************************************************************************/
const quickSort3 = array => {
  const recursiveSort = (arr, i) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[i];
    const leftArr = [];
    const rightArr = [];

    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > pivot) rightArr.push(arr[j]);
      else if (arr[j] <= pivot && j !== i) leftArr.push(arr[j]);
    }
    return [
      ...recursiveSort(leftArr, Math.floor(leftArr.length / 2)),
      pivot,
      ...recursiveSort(rightArr, Math.floor(rightArr.length / 2)),
    ];
  };

  return recursiveSort([...array], Math.floor(array.length / 2));
};

/*************************************/
/* Testing */
/*************************************/
const Test = require('../../../RapidTest/Test');
const testFunctions = [quickSort, quickSort2, quickSort3];

const dataArray = [[35, 44, 59, 99, 101, 7, 62, 79, 99, 142]];

Test(dataArray, testFunctions);
