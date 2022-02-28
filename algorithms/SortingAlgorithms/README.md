# Sorting Algorithms - What? How? Where? Why?

Sorting algorithms are used all over various applications for different use cases. For instance, Amazon let's you use **Sort Alphabetically** or by the **Most Reviews**. This can go from a basic sort of an ascending or a descending order of items to much more complex sorts where a sorting order is mentioned.

## Different Sorting Algorithms
Sorting algorithms vary based on the methodology used to sort the list of elements. Each have their own quirks and may vary in performance over the other in specific use cases.
It involves swapping two elements in a list, so first let's declare a very basic swap function:

**Swap Function:**
```
const swap = (arr, indx1, indx2) => [arr[indx1], arr[indx2]] = [arr[indx2], arr[indx1]];
```

**Note:** *For the examples below, we will be using basic C Style for-loops that are used in almost all programming languages. The same can be done with using `while loop`, `forEach loop`, `recursive function`. For these other implementations, check the `js` files in this repository.*

--------------------------------------------------------------------------------------------------------

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
The selection sort algorithm sorts a list `arr` by repeatedly finding the criteria element `select` *(the minimum value, if we are considering ascending order)* from unsorted part and swapping the current item at the current index `i` with the criteria `select` **(hence selection sort)** item, at it's **last index** `arr.lastIndexOf(select)` and continues comparing the next item at the index `i + 1` to the criteria's first element from next unordered part of the list `Math.select(arr[i + 1], arr.splice(i + 1, arr.length)` *(as per our example of ascending order)*.

**Note:** Selecting the criteria item at it's last index is crucial as we are moving progressively down the array. In case of duplicate items, finding any index, may make selections from already sorted and swap those, causing an error in the sorting process.

**Syntax:**
```
const selectionSort = array => {
    const arr = [...array];
    for(let i = 0; i < arr.length - 1; i++) {
        for(let j = i; j < arr.length; j++) {
            const select = Math.select(arr[j], ...arr.slice(j+1, arr.length));
            if(select < arr[j]) swap(arr, j, arr.lastIndexOf(select));
        }
    }
    return arr;
}
```

## JavaScript Array.prototype.sort()
The arr.sort() method is used to sort the array in place in a given order according to the compare() function. If the method is omitted then the array is sorted in ascending order.

**Parameters:** This method accept a single parameter as mentioned above and described below:

**compareFunction:** This parameters is used to sort the elements according to different attributes and in the different order.

> `compareFunction(a,b) < 0`
> Then a comes before b in the answer.
>
> `compareFunction(a,b) > 0`
> Then b comes before a in the answer.
>
> `compareFunction(a,b) = 0`
> Then the order of a and b remains unchanged.

**Return value:** This method returns the reference of the sorted original array.

**Syntax:**
```

```