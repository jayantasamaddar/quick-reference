import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const { argv } = yargs(hideBin(process.argv));

console.log(argv);

if (argv.dev) {
  console.log('Running in development mode');
  // Insert code to execute in development mode
} else {
  console.log('Running in production mode');
  // Insert code to execute in production mode
}
