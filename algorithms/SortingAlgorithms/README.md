# Sorting Algorithms - What? How? Where? Why?

Sorting algorithms are used all over various applications for different use cases. For instance, Amazon let's you use **Sort Alphabetically** or by the **Most Reviews**. This can go from a basic sort of an ascending or a descending order of items to much more complex sorts where a sorting order is mentioned.

## Different Sorting Algorithms
Sorting algorithms vary based on the methodology used to sort the list of elements. Each have their own quirks and may vary in performance over the other in specific use cases.
It involves swapping two elements in a list, so first let's declare a very basic swap function:

**Swap Function:**
```
const swap = (arr, indx1, indx2) => [arr[indx1], arr[indx2]] = [arr[indx2], arr[indx1]];
```


## Bubble Sort
Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order. It does so by comparing in an given list `array` of items, if item at index `i` compares correctly to item at index `i + 1`. If so it does a simple swap operation and continues comparing the next set of items until it reaches the end of the list.


**Syntax:**
```
const bubbleSort = array => {
    const arr = [...array];
    for(let i = 0; i < arr.length - 1; i++) {
        for(let j = 0; j < arr.length - 1 - i; j++) {
            if(arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}
```

## Selection Sort
The selection sort algorithm sorts a list `arr` by repeatedly finding the criteria element `min` *(the minimum value, if we are considering ascending order)* from unsorted part and swapping it with the item at the current index `i` and continues comparing the next item at the index `i + 1` to the criteria's first element from next unordered part of the list `Math.min(arr[i + 1], arr.splice(i + 1, arr.length)` *(as per our example of ascending order)*.

**Syntax:**
```
const selectionSort = array => {
    const arr = [...array];
    for(let i = 0; i < arr.length - 1; i++) {
        for(let j = i; j < arr.length; j++) {
            const min = Math.min(arr[j], ...arr.slice(j+1, arr.length));
            if(min < j) swap(arr, j, arr.lastIndexof(min));
        }
    }
    return arr;
}
```