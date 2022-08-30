// import { default as _data } from './lib/data.js';
import crypto from 'crypto';
import decoder, { StringDecoder } from 'string_decoder';

// /** Testing */

// // Create
// _data.create('test', 'newFile', { foo: 'bar' }, error => {
//   console.log({ error });
// });

// // Read
// _data.read('test', 'newFile', (error, data) => {
//   const decoder = new StringDecoder('utf-8');
//   const buffer = '' + decoder.write(data);
//   console.log({ error, data: JSON.parse(buffer) });
// });

// // Update
// _data.update('test', 'newFile', { fizz: 'bizz' }, error => {
//   console.log({ error });
// });

// // Delete
// _data.delete('test', 'newFile', error => {
//   console.log({ error });
// });

crypto.randomBytes(32, (err, buf) => {
  if (err) throw err;
  // const decoder = new StringDecoder('base64');
  // let hash = '';
  // hash += decoder.write(buf);
  // console.log(hash);
  console.log(buf.toString('base64'));
});

/** Test Twilio */
helpers.sendTwilioSMS('9831373153', 'Hello!', error => {
  console.log({ error });
});
