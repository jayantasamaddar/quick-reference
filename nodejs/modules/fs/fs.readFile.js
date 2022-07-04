import fs from 'fs';

/** fs.readFile (asynchronous) */
const buffer = fs.readFile('../../assets/panagram.txt', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  /** Do something with the data */
  console.log(data);
  return data;
});
