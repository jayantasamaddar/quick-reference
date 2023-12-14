# Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
  - [What is RxJs?](#what-is-rxjs)
  - [RxJs: Pros and Cons](#rxjs-pros-and-cons)
    - [Pros](#pros)
    - [Cons](#cons)
  - [Core Concepts](#core-concepts)
- [Observers, Observables and Subscription](#observers-observables-and-subscription)
  - [Sequence of Events](#sequence-of-events)
  - [Observable](#observable)
  - [Observer](#observer)
  - [Subscription](#subscription)
- [Functions](#functions)
  - [`of`](#of)
- [Operators](#operators)
  - [Pipeable Operators](#pipeable-operators)
    - [Imperative Style vs Declarative Style](#imperative-style-vs-declarative-style)
    - [`map`](#map)
    - [`take`](#take)
    - [`tap`](#tap)
    - [`shareReplay`](#sharereplay)
    - [`concat`](#concat)
- [Higher-Order Observables](#higher-order-observables)
- [Subject](#subject)
  - [What is a Subject?](#what-is-a-subject)
  - [`RelaySubject`](#relaysubject)
  - [`lastValueFrom`](#lastvaluefrom)

---

# Introduction

## What is RxJs?

RxJS is a JavaScript/TypeScript library for composing asynchronous and event-based programs by using observable sequences.

It provides:

1. One core type, the **`Observable`**,
2. Satellite types: **`Observer`**, **`Schedulers`**, **`Subjects`** and operators inspired by Array methods (`map`, `filter`, `reduce`, `every`, etc) to allow handling asynchronous events as collections.

> Think of RxJS as Lodash for events.

RxJs combines the [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern) with the [Iterator Pattern](https://en.wikipedia.org/wiki/Iterator_pattern) and [functional programming with collections](https://martinfowler.com/articles/collection-pipeline/#NestedOperatorExpressions) to fill the need for an ideal way of managing sequences of events.

---

## RxJs: Pros and Cons

### Pros

One of the simple reasons why we want to use RxJs is to avoid Callback hell found in many JavaScript patterns. In fact Callback hell is an anti-pattern in RxJs. here's a detailed list of benefits of using RxJs:

1. **Unified Abstraction**: RxJS provides a consistent and unified abstraction for handling not only DOM events but also a wide range of asynchronous data sources, such as HTTP requests, timers, and more. This means you can use the same programming paradigm for various types of asynchronous operations.

2. **Reactive Programming Paradigm**: RxJS follows the reactive programming paradigm, which allows you to work with asynchronous data streams using a consistent and composable approach. This paradigm is particularly useful for handling complex asynchronous scenarios.

3. **Declarative Approach**: With RxJS, you can define complex data flows and transformations in a declarative manner. This makes the code easier to read, understand, and maintain compared to imperative approaches.

4. **Data Transformation and Composition**: With RxJS, you can easily transform, filter, merge, and combine streams of events or data. This composability enables you to create complex event handling scenarios using a declarative approach.

5. **Complex Event Scenarios**: RxJS excels in scenarios where you need to handle complex sequences of events, such as throttling, debouncing, merging events from multiple sources, and handling race conditions.

6. **Backpressure Handling**: RxJS provides mechanisms to handle backpressure, which is crucial in cases where events are produced faster than they can be consumed. This helps prevent memory issues and ensures that your application remains performant.

7. **Error Handling**: RxJS provides a powerful and consistent way to handle errors within event streams. You can use operators like catchError to gracefully handle errors without interrupting the stream.

8. **Resource Management**: RxJS Observables can be easily canceled or unsubscribed from, helping you manage resources and prevent memory leaks. This is especially important in scenarios where you dynamically add and remove event listeners.

9. **Testing**: RxJS makes it easier to test event-driven code. You can use marble diagrams and schedulers to simulate and control the timing of events, making your tests more predictable and reliable.

10. **Functional Programming Concepts**: RxJS encourages functional programming principles, such as immutability and pure functions. This can lead to more maintainable and testable code.

11. **Integration with UI Libraries**: If you're working with UI frameworks like Angular, RxJS integrates seamlessly with their reactive programming model. It helps manage asynchronous data flows, user interactions, and state changes more efficiently.

12. **Complex UI Interactions**: For applications with complex user interfaces and interactions, RxJS can provide a cleaner and more organized way to manage events, state changes, and updates.

13. **Complex Use Cases**: RxJS is particularly powerful for scenarios involving real-time data, event-driven systems, continuous updates, and complex data transformations.

---

### Cons

**Some of the Drawbacks may include**:

- Learning Curve maybe steep for newer programmers who are not used to event-driven systems or Reactive programming.
- Performance Overhead due to additional abstraction layer
- Memory leaks caused by improper usage like failing to unsubscribe
- Debugging complexity
- Best used for mid size to large projects as it may increase bundle size for smaller projects
- Additional Abstraction may feel unintuitive to certain developers

---

## Core Concepts

The essential concepts in RxJS which solve async event management are:

- **`Observable`**: represents the idea of an invokable collection of future values or events.
- **`Observer`**: is a collection of callbacks that knows how to listen to values delivered by the Observable.
- **`Subscription`**: represents the execution of an Observable, is primarily useful for cancelling the execution.
- **`Operators`**: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
- **`Subject`**: is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
- **`Schedulers`**: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.

---

# Observers, Observables and Subscription

## Sequence of Events

Here's a typical sequence of events when working with Observers and Observables:

1. An Observable is initialized and ready to emit values.
2. The Observer subscribes to the Observable to listen for event notifications.
3. The Observable starts emitting values.
4. Three kinds of notifications may be emitted by an observable which are listened to by the Observer: `next`, `error` and `complete`, each allowing us to take action:

   - For each emitted value, the Observable calls the `next` method on the Observer.
   - If an error occurs during the sequence, the Observable calls the `error` method on the Observer and terminates.
   - If the Observable completes successfully (finishes emitting all values), it calls the `complete` method on the Observer.

This is just the workflow in theory. The implementation and details are in the following sections.

---

## Observable

Observables are lazy Push collections of multiple values.

What that means is, an `Observable` is an uninitialized event stream. By itself an Observable does nothing unless subscribed to. Subscribing to an Observable initializes the **[`Observers`](#observer)** for the event stream. You can also unsubscribe from it.

We can create an `Observable` either from pre-defined RxJs functions that returns Observables or by using the Observable constructor.

**Example 1**: Use the `interval` RxJs function to create an Observable which when subscribed to emits incremental numbers periodically in time.

```js
import { interval } from "rxjs";

/** Initialize the interval observable. */
const interval$ = interval(1000); // As a convention often the `$` suffix is used to denote that the variable is an Observable

/** Subscribe to event stream */
// Syntax Deprecated in v8 (Might find this in older versions)
interval$.subscribe(
  (val) => console.log(val),
  (err) => console.log(err),
  () => console.log("Completed")
);

// Current way of using. Here we also store it in a variable to later call the `unsubscribe` method on.
const intervalSub = interval$.subscribe({
  next: (val) => console.log(val),
  error: (err) => console.log(err),
  complete: () => console.log("Completed"),
});

// Unsubscribe after 10 seconds
setTimeout(() => intervalSub.unsubscribe(), 10 * 1000);
```

**Example 2**: The following is a custom Observable that pushes the values 1, 2, 3 immediately (synchronously) when subscribed, and the value 4 after one second has passed since the subscribe call, then completes:

```js
import { Observable } from "rxjs";

/** Initialize an Observable */
const observable$ = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

/** Subscribe to event stream */
// Syntax: `observable.subscribe(observer)`
observable.subscribe({
  next: (x) => console.log("got value " + x),
  error: (err) => console.error("something wrong occurred: " + err),
  complete: () => console.log("done"),
});
```

**Example 3**: Create an HTTP observable

```js
import { Observable, noop } from "rxjs";

const endpoint = "https://restcountries.com/v3.1/all";

// Create a http$ Observable
const http$ = new Observable((subscriber) => {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      subscriber.next(data);
    })
    .catch((err) => subscriber.error(err))
    .finally(() => subscriber.complete());
});

// Subscribe to the http$ Observable
http$.subscribe({
  next: (data) => console.log(data),
  error: (error) => console.error(error),
  // noop basically runs a no operation function `() => {}`
  complete: noop,
});
```

---

## Observer

An **`Observer`** is a consumer of values delivered by an **[`Observable`](#observable)**. **`Observers`** are simply a set of callbacks, one for each type of notification delivered by the Observable: next, error, and complete. The following is an example of a typical Observer object and how it is used:

```js
// An Observer object containing callbacks for `next`, `error` and `complete`
const observer = {
  next: (value) => console.log("Observer got a next value: " + value),
  error: (error) => console.error("Observer got an error: " + error),
  complete: () => console.log("Observer got a complete notification"),
};

// To use the Observer, provide it to the subscribe of an Observable
observable.subscribe(observer);
```

> In short, **Observers are just objects with three callbacks, one for each type of notification that an Observable may deliver**.

Where,

- `next(value)`: This method is called whenever the Observable emits a new value. It is responsible for processing the emitted value and performing any necessary actions or computations. It's important to note that next is not called for the complete or error events.

- `error(error)`: This method is called when an error occurs within the Observable sequence. If an error occurs during the processing of the sequence, the Observable will notify the Observer by calling its error method. Once the error method is called, no further values will be emitted, and the Observable's processing is terminated.

- `complete()`: This method is called when the Observable sequence completes successfully. It indicates that the Observable has finished emitting values and will not emit any more. After calling the complete method, the Observable will not emit any more values or errors.

**Shorthand syntax**:

There's a way to access the `next` callback immediately without the entire Observer object. When using this syntax, internally in `observable.subscribe`, it will create an Observer object using the callback argument as the next handler.

```js
observable.subscribe((val) => console.log("Observer got a next value: " + val));
```

---

## Subscription

A **`Subscription`** is an object that represents a disposable resource, usually the execution of an Observable.

A Subscription has one important method, `unsubscribe`, that takes no argument and just disposes the resource held by the subscription.

```js
import { interval } from "rxjs";

const observable = interval(1000);
const subscription = observable.subscribe((x) => console.log(x));
// Later:
// This cancels the ongoing Observable execution which was started by calling subscribe with an Observer.
// Unsubscribe after 10 seconds
setTimeout(() => subscription.unsubscribe(), 10 * 1000);
```

A Subscription has two other methods:

- `add(otherSubscription)`: Adds one subscription into another, essentially clubbing them together, so that a single `unsubscribe()` can unsubscribe multiple subscriptions.
- `remove(otherSubscription)`: Undo the addition of a child Subscription previously added with `add(otherSubscription)`.

It also has a property:

- `closed`: A boolean that acts as a flag to indicate whether this Subscription has already been unsubscribed.

```js
import { interval } from "rxjs";

const observable1 = interval(400);
const observable2 = interval(300);

const subscription = observable1.subscribe((x) => console.log("First: " + x));
const childSub = observable2.subscribe((x) => console.log("Second: " + x));

// Add childSub into subscription
subscription.add(childSub);

// Returns false
console.log("Before unsubscribe:", subscription.closed);

setTimeout(() => {
  // Unsubscribes BOTH subscription and childSub
  subscription.unsubscribe();

  // Returns true
  console.log("After unsubscribe:", subscription.closed);
}, 1000);
```

---

# Functions

## `of`

Converts the arguments to an `Observable` that upon subscription, emits the arguments as its `next` value.

```ts
import { of } from "rxjs";

of(10, 20, 30).subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log("Error:", err),
  complete: () => console.log("The End"),
});

// Outputs
// 10
// 20
// 30
// The End
```

---

# Operators

Operators are functions.

There are two kinds of operators:

1. Pipeable Operators
2. Creation Operators

## Pipeable Operators

A Pipeable Operator is a function that takes an `Observable` as its input and returns another `Observable`. It is a pure operation: the previous Observable stays unmodified.

To demonstrate this, let's put the HTP observable in an earlier example from the **[`Observable`](#observable)** section and put it inside a reusable function:

In `utils.ts`

```ts
import { Observable } from "rxjs";

export const createHTTPObservable = <T>(url: string): Observable<T> => {
  return new Observable((subscriber) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        subscriber.next(data);
      })
      .catch((err) => subscriber.error(err))
      .finally(() => subscriber.complete());
  });
};
```

In a separate file,

```ts
import { createHTTPObservable } from "./utils";
import { map, noop } from "rxjs";
import type { Country } from "./types";

const http$ = createHTTPObservable<Country[]>(
  "https://restcountries.com/v3.1/all"
);

// Get only the first 5 countries
const countries$ = http$.pipe(map((res) => res.slice(0, 5)));

// Get only the official names of the countries
countries$.subscribe({
  next: (countries) =>
    console.log(countries.map((country) => country.name.official)),
  error: (error) => console.error(error),
  complete: noop,
});

/**
 * Output
 * ------
    [
        'Islamic Republic of Mauritania',
        'State of Eritrea',
        'Commonwealth of Puerto Rico',
        'Romania',
        'Antigua and Barbuda'
    ]
*/
```

### Imperative Style vs Declarative Style

Subscribing to an observable to pass values to an UI component often may result in an imperative style of using RxJs, resulting in long callbacks which are considered an anti-pattern. As a rule of thumb, always choose the declarative method when writing RxJs code.

**Example**:

To demonstrate this, first let's put the HTP observable in an earlier example from the **[`Observable`](#observable)** section and put it inside a reusable function:

In `utils.ts`,

```ts
import { Observable } from "rxjs";

export const createHTTPObservable = <T>(url: string): Observable<T> => {
  return new Observable((subscriber) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        subscriber.next(data);
      })
      .catch((err) => subscriber.error(err))
      .finally(() => subscriber.complete());
  });
};
```

In `component.ts`, using **Imperative Method**:

```ts
import { createHTTPObservable } from "./utils";
import { Observable, map, noop } from "rxjs";
import type { Country } from "./types";

// Create Observable
const http$ = createHTTPObservable<Country[]>(
  "https://restcountries.com/v3.1/all"
);

// Get only the official names of the first 5 countries and pipe into an Observable
const countries$ = http$.pipe(map((res) => res.slice(0, 5)));

let europeanCountries$: Observable<Country[]>;
let africanCountries$: Observable<Country[]>;

countries$.subscribe({
  next: (countries) => {
    // Print the official names of the countries
    console.log(countries.map((country) => country.name.official));

    // Get European Countries from the `countries$` Observable and Pipe into a new Observable
    europeanCountries$ = countries$.pipe(
      map((res) =>
        res.filter((country) => country.continents.includes("Europe"))
      )
    );

    // Get African Countries from the `countries$` Observable and Pipe into a new Observable
    africanCountries$ = countries$.pipe(
      map((res) =>
        res.filter((country) => country.continents.includes("Africa"))
      )
    );
  },
  error: (error) => console.error(error),
  complete: noop,
});
```

Now the same thing with declarative method while avoiding callback hell, may look like this:

In `component.ts` using **Declarative Method**:

```ts
import { createHTTPObservable } from "./utils";
import { map } from "rxjs";
import type { Country } from "./types";

// Create Observable
const http$ = createHTTPObservable<Country[]>(
  "https://restcountries.com/v3.1/all"
);

// Get only the official names of the first 5 countries and pipe into an Observable
const countries$ = http$.pipe(map((res) => res.slice(0, 5)));

// Get European Countries from the `countries$` Observable and Pipe into a new Observable
const europeanCountries$ = countries$.pipe(
  map((res) => res.filter((country) => country.continents.includes("Europe")))
);

// Get African Countries from the `countries$` Observable and Pipe into a new Observable
const africanCountries$ = countries$.pipe(
  map((res) => res.filter((country) => country.continents.includes("Africa")))
);
```

As you can see the Declarative method is much cleaner, easy to read and avoids callback hell.

---

### `map`

Map transforms the items emitted by an observable by applying a function on each item

---

### `take`

Emits only the first `count` values emitted by the source Observable.

```ts
import { interval, take } from "rxjs";

const interval$ = interval(1000);
const takeFive$ = interval$.pipe(take(5));
takeFive$.subscribe((value) => console.log(value));

// Logs:
// 0
// 1
// 2
// 3
// 4
```

---

### `tap`

Used to perform side-effects for notifications from the source Observable.

`Tap` is designed to allow the developer a designated place to perform side effects. While you could perform side-effects inside of a `map` or a `mergeMap`, that would make their mapping functions impure, which isn't always a big deal, but will make it so you can't do things like memoize those functions. The `tap` operator is designed solely for such side-effects to help you remove side-effects from other operations.

```ts
import { createHTTPObservable } from "./examples/http/utils";
import { map, tap } from "rxjs";
import type { Country } from "./examples/http/types";

// Create Observable
const http$ = createHTTPObservable<Country[]>(
  "https://restcountries.com/v3.1/name/India"
);

http$
  .pipe(
    tap(() => console.log("HTTP request executed")),
    map((res) => res.slice(0, 5))
  )
  .subscribe(console.log);
```

---

### `shareReplay`

Share source and replay specified number of emissions on subscription.

`shareReplay` is an operator that transforms an Observable into a multicast Observable that replays a specified number of the most recent values to new subscribers. It caches the emitted values and allows new subscribers to immediately receive a replay of the cached values upon subscription. This ability to replay values on subscription is what differentiates `share` and `shareReplay`.

```ts
import { createHTTPObservable } from "./utils";
import { map, shareReplay } from "rxjs";
import type { Country } from "./types";

// Create Observable
const http$ = createHTTPObservable<Country[]>(
  "https://restcountries.com/v3.1/all"
);

const countries$ = http$.pipe(
  tap(() => console.log("HTTP request executed")),
  map((res) => res.slice(0, 5)),
  shareReplay(2)
);

const europeanCountries$ = countries$.pipe(
  map((res) => res.filter((country) => country.continents.includes("Europe")))
);

const africanCountries$ = countries$.pipe(
  map((res) => res.filter((country) => country.continents.includes("Africa")))
);
```

With `shareReplay()` we will see that the "HTTP request executed" is only executed once.
If we take this off, there will be two executions of the HTTP request within the `http$` Observable which is twice called via the `countries$` Observable.

**Reference counting**:

By default `shareReplay` will use `refCount` of `false`, meaning that it will not unsubscribe the source when the reference counter drops to zero, i.e. the inner [`ReplaySubject`](#relaysubject) will not be unsubscribed (and potentially run for ever). This is the default as it is expected that `shareReplay` is often used to keep around expensive to setup observables which we want to keep running instead of having to do the expensive setup again.

As of RXJS version 6.4.0 a new overload signature was added to allow for manual control over what happens when the operators internal reference counter drops to zero. If `refCount` is true, the source will be unsubscribed from once the reference count drops to zero, i.e. the inner `ReplaySubject` will be unsubscribed. All new subscribers will receive value emissions from a new `ReplaySubject` which in turn will cause a new subscription to the source observable.

With `refCount: true`:

```ts
import { createHTTPObservable } from "./utils";
import { map, shareReplay } from "rxjs";
import type { Country } from "./types";

// Create Observable
const http$ = createHTTPObservable<Country[]>(
  "https://restcountries.com/v3.1/all"
);

const countries$ = http$.pipe(
  tap(() => console.log("HTTP request executed")),
  map((res) => res.slice(0, 5)),
  shareReplay({ bufferSize: 2, refCount: true })
);

const europeanCountries$ = countries$.pipe(
  map((res) => res.filter((country) => country.continents.includes("Europe")))
);

const africanCountries$ = countries$.pipe(
  map((res) => res.filter((country) => country.continents.includes("Africa")))
);
```

---

### `concat`

Creates an output Observable by joining multiple Observables together, which when subscribed to sequentially emits all values from the first given Observable and then moves on to the next, one after the other.

You can pass either an array of Observables, or put them directly as arguments. Passing an empty array will result in Observable that completes immediately.

**Example 1**:

```ts
import { interval, take, range, concat } from "rxjs";

const timer = interval(1000).pipe(take(4));
const sequence = range(4, 6);
const result = concat(timer, sequence);
result.subscribe((value) => console.log(value));

// Results in:
// 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 4 ... 9
```

**Example 2**:

```ts
import { interval, take, of, concat } from "rxjs";

const timer$ = interval(1000).pipe(take(4));
const source1$ = of(4, 5, 6);
const source2$ = of(7, 8, 9);
const result = concat(timer$, source1$, source2$);
result.subscribe((value) => console.log(value));

// Results in:
// 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 4, 5, 6 -immediate-> 7, 8, 9
```

> **Note**:
>
> - If some input `Observable` never completes, `concat` will also never complete and `Observables` following the one that did not complete will never be `subscribed`. On the other hand, if some `Observable` simply completes immediately after it is `subscribed`, it will be invisible for `concat`, which will just move on to the next `Observable`.
> - If any `Observable` in chain errors, instead of passing control to the next `Observable`, concat will error immediately as well. `Observables` that would be subscribed after the one that emitted error, never will.
> - If you pass to `concat` the same `Observable` many times, its stream of values will be "replayed" on every `subscription`, which means you can repeat given `Observable` as many times as you like. If passing the same Observable to concat 1000 times becomes tedious, you can always use [`repeat`](#repeat).

---

# Higher-Order Observables

```
What if the `shareReplay` bufferSize number is not entered. Does RxJs dynamically handle the bufferSize ?

Also what if only the `refCount: true` is passed as a `ShareReplayConfig` without any bufferSize ?
```

---

# Subject

## What is a Subject?

```ts
import { Subject } from "rxjs";

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(1);
subject.next(2);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```

---

## `RelaySubject`

---

## `lastValueFrom`

Converts an observable to a promise by subscribing to the observable, waiting for it to complete, and resolving the returned promise with the last value from the observed stream.

**Syntax**: `lastValueFrom<T, D>(source: Observable<T>, config?: LastValueFromConfig<D>): Promise<T | D>`

```ts
import { interval, take, lastValueFrom } from "rxjs";

async function execute() {
  const source$ = interval(2000).pipe(take(10));
  const finalNumber = await lastValueFrom(source$);
  console.log(`The final number is ${finalNumber}`);
}

execute();

// Expected output:
// 'The final number is 9'
```

> If the observable stream completes before any values were emitted, the returned promise will reject with `EmptyError` or will resolve with the default value if a default was specified.
>
> If the observable stream emits an error, the returned promise will reject with that error.
>
> **WARNING**: Only use this with observables you know will complete. If the source observable does not complete, you will end up with a promise that is hung up, and potentially all of the state of an async function hanging out in memory. To avoid this situation, look into adding something like `timeout`, `take`, `takeWhile`, or `takeUntil` amongst others.

---
