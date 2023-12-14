import { interval, take, of, concat } from "rxjs";

const timer$ = interval(1000).pipe(take(4));
const source1$ = of(4, 5, 6);
const source2$ = of(7, 8, 9);
const result = concat(timer$, source1$, source2$);
result.subscribe((value) => console.log(value));

// Results in:
// 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 4, 5, 6 -immediate-> 7, 8, 9
