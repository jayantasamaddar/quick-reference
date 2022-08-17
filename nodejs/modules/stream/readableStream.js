import { Readable } from 'stream';
import { randomBytes } from 'crypto';

function* dataGenerator() {
  while (true) {
    yield randomBytes(2 ** 3).toString('hex');
  }
}

const logger = {
  info: message => console.log(`\x1b[34m[INFO]\x1b[0m: ${message}`),
  error: message => console.log(`\x1b[34m[ERROR]\x1b[0m: ${message}`),
};

class MyCustomReadableStream extends Readable {
  _read() {
    let chunk;
    while (!(chunk = dataGenerator().next()).done && this.push(chunk.value)) {
      logger.info(`Received: ${chunk.value}`);
      logger.info(`Buffer size: ${this.readableLength}`);
    }
  }
}

const myCustomReadableStream = new MyCustomReadableStream();

myCustomReadableStream.on('error', err => {
  logger.error(`Error: ${err.name} ${err.message}`);
});

while (myCustomReadableStream.read()) {}
