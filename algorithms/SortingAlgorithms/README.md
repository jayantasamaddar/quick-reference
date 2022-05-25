# Sorting Algorithms - What? How? Where? Why?

Sorting algorithms are used all over various applications for different use cases. For instance, Amazon let's you use **Sort Alphabetically** or by the **Most Reviews**. This can go from a basic sort of an ascending or a descending order of items to much more complex sorts where a sorting order is mentioned.

## Different Sorting Algorithms

Sorting algorithms vary based on the methodology used to sort the list of elements. Each have their own quirks and may vary in performance over the other in specific use cases.
It involves swapping two elements in a list, so first let's declare a very basic swap function:

**Swap Function:**

```
const swap = (arr, indx1, indx2) => [arr[indx1], arr[indx2]] = [arr[indx2], arr[indx1]];
```

**Note:** _For the examples below, we will be using basic C Style for-loops that are used in almost all programming languages. The same can be done with using `while loop`, `for-in loop`, `recursive function`. For these other implementations, check the `js` files in this repository._

---

# Types of Sorting Algorithms

1. Bubble Sort
2. Selection Sort
3. Insertion Sort
4. Merge Sort
5. Quick Sort
6. Heap Sort

---

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

---

## Selection Sort

The selection sort algorithm sorts a list `arr` by repeatedly finding the criteria element `select` _(the minimum value, if we are considering ascending order)_ from unsorted part and swapping the current item at the current index `i` with the criteria `select` **(hence selection sort)** item, at it's **last index** `arr.lastIndexOf(select)` and continues comparing the next item at the index `i + 1` to the criteria's first element from next unordered part of the list `Math.select(arr[i + 1], arr.splice(i + 1, arr.length)` _(as per our example of ascending order)_.

**Note:** Selecting the criteria item at it's last index is crucial as we are moving progressively down the array. In case of duplicate items, finding any index, may make selections from already sorted and swap those, causing an error in the sorting process.

**Syntax:**

```
const selectionSort = array => {
    const arr = [...array];
    for(let i = 0; i < arr.length - 1; i++) {
        for(let j = i; j < arr.length; j++) {
            const selection = Math.min(...arr.slice(j));
            if(selection < arr[j]) swap(arr, j, arr.lastIndexOf(selection));
        }
    }
    return arr;
}
```

---

## Insertion Sort

Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.

![Insertion Sort Diagram | via GeeksForGeeks](https://media.geeksforgeeks.org/wp-content/uploads/insertionsort.png)

```
const insertionSort = array => {
  const arr = array.slice();
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i; j >= 0; j--) {
      if (arr[j] > arr[j + 1]) swap(arr, j, j + 1);
    }
  }
  return arr;
};
```

---

## Merge Sort

Merging is the process of combining two pre-sorted lists into a single sorted list.

---

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
