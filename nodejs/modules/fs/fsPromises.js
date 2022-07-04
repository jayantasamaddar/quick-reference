import fs from 'fs/promises';

/** fsPromises */
const bufferFn = async () => {
  try {
    const data = await fs.readFile('../../assets/panagram.txt');
    /** Do something with the data */
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

bufferFn();
