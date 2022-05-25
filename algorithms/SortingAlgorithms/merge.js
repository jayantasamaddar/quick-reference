/**
 * I. Merging is the process of combining two or more pre-sorted Lists into a single sorted List
 * - Two-way Merge - Merging two pre-sorted Lists into a single sorted List
 * - M-way Merge - Merging m number of pre-sorted Lists into a single sorted List
 */

/*******************************************************************************************/

/** MERGING **/

/*******************************************************************************************/
// Merge - Iterative Method - Using While loop
/*******************************************************************************************/
const twoWayMerge = (arr1, arr2) => {
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

/*******************************************************************************************/
// Merge - Using Recursive Method
/*******************************************************************************************/
const twoWayMerge2 = (arr1, arr2) => {
  const mergedList = [];
  const recursiveSort = (i, j) => {
    if (j === arr2.length && i === arr1.length) return mergedList;

    for (i; i < arr1.length; i++) {
      if (j === arr2.length) {
        // If elements of arr2 are already placed in the mergedList, push remaining elements of arr1
        mergedList.push(...arr1.slice(i));
        return recursiveSort(arr1.length, j);
      }
      for (j; j < arr2.length; j++) {
        if (arr2[j] < arr1[i]) mergedList.push(arr2[j++]);
        else if (arr1[i] < arr2[j]) mergedList.push(arr1[i++]);
        else mergedList.push(arr1[i++], arr2[j++]);
        break;
      }
      return recursiveSort(i, j);
    }
    // If elements of arr1 are already placed in the mergedList, push remaining elements of arr2
    mergedList.push(...arr2.slice(j));
    return recursiveSort(i, arr2.length);
  };
  return recursiveSort(0, 0);
};

/*************************************/
/* Testing */
/*************************************/
const arr1 = [35, 44, 59, 99, 101];
const arr2 = [7, 62, 79, 99, 142];

console.log(twoWayMerge(arr1, arr2));
console.log(twoWayMerge2(arr1, arr2));

module.exports = {
  twoWayMerge,
  twoWayMerge2,
};

/**
 * Glossary
 * ----------
 * Note: array[i++], increments the value of i. The expression first evaluates to array[i], before i
 * is incremented.
 */
