const swap = (arr, indx1, indx2) => [arr[indx1], arr[indx2]] = [arr[indx2], arr[indx1]];

/* Using C Style for-Loop */
const bubbleSort = array => {
    const arr = [...array];
    for(let i = 0; i < arr.length - 1; i++) {
        for(let j = 0; j < arr.length - 1 - i; j++) {
            if(arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)
            }
        }
    }
    return arr;
}

/* Using while-loop */
const bubbleSort2 = array => {
    const arr = [...array];
    let counter = arr.length;
    while(counter > 0) {
        for(let i = 0; i < arr.length - 1; i++) {
            if(arr[i] > arr[i + 1]) swap(arr, i, i + 1)
        }
        counter --;
    }
    return arr;
}

/* Using recursive Function */
const bubbleSort3 = array => {
    const arr = [...array];
    const recursiveSort = (arr, indx) => {
        let i = indx;
        if(i === arr.length - 1) return arr;

        for(let j = 0; j < arr.length - 1 - i; j++) {
            if(arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)
            }
        }
        i++;
        return recursiveSort(arr, i);
    }
    return recursiveSort(arr, 0);
}

/* Testing */
const array = [62, 15, 24, 82, 43, 52, 112, 74, 96, 101, 31, 123]
console.log(bubbleSort(array));
console.log(bubbleSort2(array));
console.log(bubbleSort3(array));