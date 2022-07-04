import fs from 'fs';

/** fs.readFileSync (synchronous) */
const buffer = fs.readFileSync('../../assets/panagram.txt', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  return data;
});
