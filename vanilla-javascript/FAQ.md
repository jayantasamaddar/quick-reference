# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Strings](#strings)
    - [What is the difference between using `charAt(index)` and `string[index]` to access a character?](#what-is-the-difference-between-using-charatindex-and-stringindex-to-access-a-character)
  - [Arrays](#arrays)
    - [How to check if the element is an Array?](#how-to-check-if-the-element-is-an-array)
  - [Events](#events)
    - [How to prevent default behaviour of an event?](#how-to-prevent-default-behaviour-of-an-event)
    - [How to manually set an Event to make a click happen somewhere in the DOM?](#how-to-manually-set-an-event-to-make-a-click-happen-somewhere-in-the-dom)

---

## Strings

### What is the difference between using `charAt(index)` and `string[index]` to access a character?

<!-- prettier-ignore -->
| #   | index value                   | charAt (return value) | Bracket notation (return value) |
| --- | ----------------------------- | --------------------- | ------------------------------- |
| 1   | index >= length               | `''`                  | `undefined`                     |
| 2   | index < 0                     | `''`                  | `undefined`                     |
| 3   | index: falsy                  | character at 0        | `undefined`                     |
| 4   | index = true                  | character at 1        | `undefined`                     |
| 5   | Number(index: string) === NaN | character at 0        | `undefined`                     |
| 6   | Number(index: string) !== NaN | character at index    | character at index              |
| 7   | index: decimal                | character at `Math.floor(Number(index))` | `undefined`  |

**Notes:**

- For **`charAt()`**, `index` is first attempted to be type coerced into a number before the index is searched.

  - Boolean values are type coerced. `Number(true)` evaluates to 1 and `Number(false)` evaluates to 0.
  - All falsy values return index 0.
  - An array containing a single element [1] or ['1'] when coerced, returns the number. Array containing multiple elements returns `NaN` and the treatment happens as per the table above.
  - If index is a decimal value, as a number, string or array with one element, `Math.floor(Number(index))` is applied.

- For **bracket notation**, type coercion is attempted when index provided is a string or an array containing one element.

  - Boolean values are not type coerced. So `true` doesn't coerce to `1`. `true` or `false` both return `undefined`.
  - All falsy values except 0, return `undefined`.
  - Decimal values return `undefined`.

- `type falsy = null | undefined | NaN | ''`
  - `falsy` doesn't include 0 here, as 0 is a valid Number index.

```
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/** index > str.length */
console.log({ charAt: str.charAt(27) }); // returns ''
console.log({ brackets: str[27] }); // returns undefined

/** index < 0 */
console.log({ charAt: str.charAt(-2) }); // returns ''
console.log({ brackets: str[-2] }); // returns undefined

/** Falsy Values */

// All falsy values, return character at index 0
console.log({ charAt: str.charAt(NaN) }); // returns 'A'
console.log({ charAt: str.charAt(false) }); // returns 'A'
console.log({ charAt: str.charAt(undefined) }); // returns 'A'
console.log({ charAt: str.charAt(null) }); // returns 'A'
console.log({ charAt: str.charAt('') }); // returns 'A'

// All falsy values except 0, return undefined
console.log({ brackets: str[NaN] }); // returns undefined
console.log({ brackets: str[false] }); // returns undefined
console.log({ brackets: str[undefined] }); // returns undefined
console.log({ brackets: str[null] }); // returns undefined
console.log({ brackets: str[''] }); // returns undefined

/** index = Boolean(true) */
console.log({ charAt: str.charAt(true) }); // returns 'B', (character at index 1)
console.log({ brackets: str[true] }); // undefined

/** Type coercion: Failure */
console.log({ charAt: str.charAt('A1') }); // returns 'A' (character at index 0)
console.log({ brackets: str['ABC'] }); // returns undefined

/** Type coercion: Success */
console.log({ charAt: str.charAt('1') }); // returns 'B' (attempts to access index after type coercion)
console.log({ brackets: str['1'] }); // returns undefined (attempts to access index after type coercion)

/** Decimal Values */
console.log({ charAt: str.charAt(1.9) }); // returns 'B', applies Math.floor(Number(index))
console.log({ charAt: str.charAt('1.9') }); // returns 'B', applies Math.floor(Number(index))
console.log({ charAt: str.charAt(['1.9']) }); // returns 'B', applies Math.floor(Number(index))

console.log({ brackets: str[1.9] }); // returns undefined
```

[View on StackOverflow](https://stackoverflow.com/a/73170435/6574719)

---

## Arrays

### How to check if the element is an Array?

**Problem:**
The Javascript property `typeof` returns the typeof for Arrays as Object, which may make it difficult to detect if it is indeed an Array or a regular Object.

**Example Use Case:**
Processing an API request of adding a customer, where you want to limit processing of Bulk adds.

**Solution:**
Define an isArray variable that stores a Boolean value if an Array is found.

**Method 1:**
`const isArray = Object.prototype.toString.call(req.body) == "[object Array]" ? true : false;`

**Method 2:**
`const isArray = Array.isArray(req.body);`

```
if(isArray) {
    return res.status(400).json({ error: "Adding Customers in Bulk is not supported." });
}
```

---

## Events

### How to prevent default behaviour of an event?

Calling `preventDefault()` during any stage of event flow cancels the event, meaning that any default action normally taken by the implementation as a result of the event will not occur.

The `preventDefault()` method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.

The event continues to propagate as usual, unless one of its event listeners calls `stopPropagation()` or `stopImmediatePropagation()`, either of which terminates propagation at once.

As noted below, calling `preventDefault()` for a non-cancelable event, such as one dispatched via EventTarget.dispatchEvent(), without specifying cancelable: true has no effect.

This is effective on form submit buttons where we want the form submit button to run an event handler without the form's default way of submitting forms, which refreshes the page.

---

### How to manually set an Event to make a click happen somewhere in the DOM?

We can do so with the help of Event Constructors. It has two parts :-

- Declare the event constructure,
- Dispatch it to a DOM element

**Syntax**

```
const clickEvent = new MouseEvent("click", {
    "view": window,
    "bubbles": true,
    "cancelable": false
});

const firstNameInput = document.getElementById("input.firstname");

// Clicks the input field with an id of 'firstname'

firstNameInput.dispatchEvent(clickEvent);
```
