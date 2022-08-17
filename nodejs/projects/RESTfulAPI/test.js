import { default as _data } from './lib/data.js';

/** Testing */

// Create
_data.create('test', 'newFile', { foo: 'bar' }, error => {
  console.log({ error });
});

// Read
_data.read('test', 'newFile', (error, data) => {
  const decoder = new StringDecoder('utf-8');
  const buffer = '' + decoder.write(data);
  console.log({ error, data: JSON.parse(buffer) });
});

// Update
_data.update('test', 'newFile', { fizz: 'bizz' }, error => {
  console.log({ error });
});

// Delete
_data.delete('test', 'newFile', error => {
  console.log({ error });
});
