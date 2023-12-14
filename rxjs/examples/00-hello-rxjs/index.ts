import { interval } from "rxjs";

// Initialize the interval observable
const interval$ = interval(1000);

// Subscribe to the event stream
const intervalSub = interval$.subscribe({
  next: (val) => console.log(val),
  error: (err) => console.log(err),
  complete: () => console.log("Completed"),
});

// Returns false
console.log("Before unsubscribe:", intervalSub.closed);

// Unsubscribe after 10 seconds
setTimeout(() => {
  intervalSub.unsubscribe();
  // Returns true
  console.log("After unsubscribe:", intervalSub.closed);
}, 10 * 1000);
