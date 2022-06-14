# What is TypeScript?

TypeScript is a strictly syntactical superset of JavaScript that adds static typing to native Javascript.

---

# Basic Types

TypeScript has the following basic types:

- Boolean
- Number
- String
- Array
- Tuple - Tuple types allow you to express an array with a fixed number of elements whose types and order are known, but need not be the same.
- Enum
- Unknown
- Any
- Void - void represents the return value of functions which don’t return a value. It’s the inferred type any time a function doesn’t have any return statements, or doesn’t return any explicit value from those return statements:
- Null
- Undefined
- Never - some functions never return a value
- object

```
let name: string; // name is a string
let age: number; // age is a number
let isStudent: boolean; // isStudent is a boolean
let hobbies: string[]; // is an array of strings
let role: [number, string] // tuple - An array containing one number and one string
let apiResponse: any; // not recommended usually.
let apiResponse2: unknown; // when the type is unknown. Takes any type. Recommended.

// The inferred return type is void
function noop():void {
  return;
}

function fail(msg: string):never => {
  throw new Error(msg);
} // Defines a function that takes a string argument and never returns anything
```

---

#### Defining a Function Type

```
let functionName: (name: string) => string; // Defines a function which takes a string argument and returns a string

let functionName2: (name: string):void =>  // Defines a function which takes a string argument and has an undefined return type

function fail(msg: string): never {
  throw new Error(msg);
};

const fail(msg: string):never => {
  throw new Error(msg);
} // Defines a function that takes a string argument and never returns anything
```

# Union Types

TypeScript’s type system allows you to build new types out of existing ones using a large variety of operators. Now that we know how to write a few types, it’s time to start combining them in interesting ways.

#### Defining a Union Type

The first way to combine types you might see is a union type. A union type is a type formed from two or more other types, representing values that may be any one of those types. We refer to each of these types as the union’s members.

Let’s write a function that can operate on strings or numbers:

```
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });
Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
```

---

# [Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

We’ve been using object types and union types by writing them directly in type annotations. This is convenient, but it’s common to want to use the same type more than once and refer to it by a single name.

A type alias is exactly that - a name for any type. The syntax for a type alias is:

```
type Person = {
  name: string;
  age?: number; // optional property
  isStudent: boolean;
};


let person: Person = {
    name: "Jayanta",
    isStudent: false
}

let team: Person[] // an array of objects having the type alias of Person
```

---

# Interfaces

```
interface Person {
  name: string;
  age?: number; // optional property
  isStudent: boolean;
};


let person: Person = {
    name: "Jayanta",
    isStudent: false
}

let team: Person[] // an array of objects having the type alias of Person
```

---

# Extending Types and Interfaces

#### Extending Types

```
type PersonAttributes = {
    gender: string,
    occupation: string,
    cars: number
}

type Human = PersonAttributes & {
  name: string;
  age?: number; // optional property
  isStudent: boolean;
};

let person: Human = {
    name: "Jayanta",
    age: 30,
    isStudent: true,
    gender: "male",
    occupation: "Full Stack Developer",
    cars: 1
}
```

---

#### Extending Interface

```
interface PersonAttributes {
    gender: string;
    occupation: string;
    cars: number;
}

interface Bikes {
  bikes?: {
    name: string;
    mileageInMiles: number;
  }[]                 // optional property, bikes is an array of objects
}

interface Person extends PersonAttributes, Bikes { // extends PersonAttributes and Bikes
    name: string;
    age?: number; // optional property
    isStudent: boolean;
}
```

# [Types vs Interface](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c)

Both Types and Interfaces serve the purpose of type checking. Both can be extended however with slightly different syntax and quirks.

- Interfaces declared with the same name are merged (extended with the same name) while type aliases can only be extended but not merged (a new type alias declaration with the same name will throw an error). In other words, i.e. a new type alias must be created to extend the types.
- The `this` keyword can be used to refer to the type implementing the interface.
- Type Aliases can be hovered over wherever it is used and the details expanded in the tooltip, while it's not the same for `interface`.
- `union` types cannot be created with interfaces.

  They have to be created with type:

  ```
  type MyUnion = string | number;
  ```

- In error reporting, type aliases may be replaced by their definition in error reporting.
- Legacy versions of Typescript do not create recursive type aliases such as type `List<V> = { v:V, right: List<V> | undefined }`

Generally interfaces are encouraged over type aliases.

---

# React Types

- **React.FC** - React Functional Component Type
- **React.ReactElement** - Basic React specific JSX Element. Typically applied to the return value of a component.
- **JSX.Element** - Basic JSX Element with `props` and `type` typed as `any`. Not necessary to use in React but can be used in other JSX based frameworks.
- **React.ReactNode** - React specific JSX Element. A node maybe an array of other React Elements or text. Typically this type is applied to the `children` property of a React Element.

  ```
  import { FC } from 'react;

  interface Props {
    loading?: string;
  }

  const Card:FC<Props> = ({ loading }): ReactElement | null => {
      return (!loading ?
        <div>Hello world</div>
        : null
      );
  }
  ```

  Where,

  - The type declaration for the function is `FC` (React Functional Component).
  - The `Props` interface is used to define the props that the component accepts.
  - `ReactElement | null` is the output of the function. i.e. output is either ReactElement or null.

---

# Type Definitions

### What are the multiple scenarios for Typescript Type Definitions?

In Typescript, when using a Javascript library there are essentially four scenarios in what concerns type definitions:

- No type definitions of any kind are available.
- Type definitions are available and shipped together with the compiler itself.
- A library does not ship with type definitions, but they can be installed separately.
- A library ships with its own type definitions built-in the library.
