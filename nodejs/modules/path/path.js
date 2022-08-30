import path from 'path';

/** Basic path input */
const __filename =
  '/home/jayantasamaddar/Work/quick-reference/nodejs/projects/RESTfulAPI/lib/data.js';

const __filename2 = '/home/user/dir/file.txt';

/** All important path module methods */

//   console.log({ fileName: path.basename(__filename) });

/****************************************************************************************************/
/** path.basename(path[, ext]) */
/****************************************************************************************************/

const basename = path.basename(__filename);
console.log(basename); // "data.js"

/****************************************************************************************************/
/** path.dirname(path) */
/****************************************************************************************************/

const dirname = path.dirname(__filename);
console.log(dirname); // "/home/jayantasamaddar/Work/quick-reference/nodejs/projects/RESTfulAPI/lib"

/****************************************************************************************************/
/** path.extname(path) */
/****************************************************************************************************/

const extname = path.extname(__filename);
console.log(extname); // ".js"

/****************************************************************************************************/
/** path.parse(path) */
/****************************************************************************************************/

const parsedPath = path.parse(__filename);
const parsedPath2 = path.parse(__filename2);
console.log(parsedPath);
// {
//     root: '/',
//     dir: '/home/jayantasamaddar/Work/quick-reference/nodejs/projects/RESTfulAPI/lib',
//     base: 'data.js',
//     ext: '.js',
//     name: 'data'
// }
console.log(parsedPath2);
// {
//     root: '/',
//     dir: '/home/user/dir',
//     base: 'file.txt',
//     ext: '.txt',
//     name: 'file'
// }

/****************************************************************************************************/

console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux'));
