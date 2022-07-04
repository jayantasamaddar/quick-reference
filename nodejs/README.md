# Nodejs Native Modules

## `fs` - or File System

1. `fs.readFileSync` (synchronous)

```
const fs = require('fs');
const buffer = fs.readFileSync('./assets/panagram.txt', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  return data
});

/** Do something with the buffer */
console.log(buffer)
```

2. `fs.readFile` (asynchronous)

```
const fs = require('fs');
const buffer = fs.readFile('./assets/panagram.txt', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  /** Do something with the data */
  console.log(data);
  return data;
});
```

3. `fsPromises`

```
const fs = require('fs/promises');
const bufferFn = async () => {
  try {
    const data = await fs.readFile('./assets/panagram.txt');
    /** Do something with the data */
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

bufferFn();
```
