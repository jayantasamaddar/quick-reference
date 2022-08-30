import { fileURLToPath, URLSearchParams } from 'url';

/****************************************************************************************************/
/** URL class */
/****************************************************************************************************/
const myURL = new URL(
  'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'
);

// {
//     href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash',
//     origin: 'https://sub.example.com:8080',
//     protocol: 'https:',
//     username: 'user',
//     password: 'pass',
//     host: 'sub.example.com:8080',
//     hostname: 'sub.example.com',
//     port: '8080',
//     pathname: '/p/a/t/h',
//     search: '?query=string',
//     searchParams: URLSearchParams { 'query' => 'string' },
//     hash: '#hash'
// }

console.log(myURL);

/****************************************************************************************************/
/** url.toJSON() */
/****************************************************************************************************/

// url.toJSON() returns a string while JSON.stringify(url) returns a JSON string which needs parsing.
const a = myURL.toJSON(); // Alias for myURL.href and myURL.toString()
console.log(a === JSON.stringify(myURL)); // Prints: false
const b = JSON.parse(JSON.stringify(myURL));
console.log(a === b); // Prints: true

/****************************************************************************************************/
/** url.search and url.searchParams */
/****************************************************************************************************/

const myUrl = new URL('https://example.org/abc?foo=~bar');
// Returns:
// URL {
//     href: 'https://example.org/abc?foo=~bar',
//     origin: 'https://example.org',
//     protocol: 'https:',
//     username: '',
//     password: '',
//     host: 'example.org',
//     hostname: 'example.org',
//     port: '',
//     pathname: '/abc',
//     search: '?foo=~bar',
//     searchParams: URLSearchParams { 'foo' => '~bar' },
//     hash: ''
// }

console.log(myUrl.search); // prints ?foo=~bar

// Modify the URL via searchParams...
myUrl.searchParams.sort();

// myUrl is now modified to:
// URL {
//     href: 'https://example.org/abc?foo=%7Ebar',
//     origin: 'https://example.org',
//     protocol: 'https:',
//     username: '',
//     password: '',
//     host: 'example.org',
//     hostname: 'example.org',
//     port: '',
//     pathname: '/abc',
//     search: '?foo=%7Ebar',
//     searchParams: URLSearchParams { 'foo' => '~bar' },
//     hash: ''
// }

console.log(myUrl.search); // prints ?foo=%7Ebar

/****************************************************************************************************/
/** URLSearchParams */
/****************************************************************************************************/

// The global URLSearchParams object is the same as the one imported.
const isSame = URLSearchParams === globalThis.URLSearchParams; // Returns 'true'.

const newURL = new URL('https://example.org/?abc=123');

// get
console.log(newURL.searchParams.get('abc')); // Prints: "123"

// append
newURL.searchParams.append('abc', 'xyz');
console.log(newURL.href); // Prints https://example.org/?abc=123&abc=xyz

// delete
newURL.searchParams.delete('abc');

// set
newURL.searchParams.set('a', 'b');
console.log(newURL.href); // Prints: https://example.org/?a=b

// URLSearchParams constructor
const newSearchParams = new URLSearchParams(newURL.searchParams);
// The above is equivalent to
// const newSearchParams = new URLSearchParams(myURL.search);

newSearchParams.append('a', 'c');
console.log(newURL.href); // Prints: https://example.org/?a=b

console.log(newSearchParams.toString()); // Prints: a=b&a=c

// newSearchParams.toString() is implicitly called
newURL.search = newSearchParams; // assigns newURL.search to 'a=b&a=c'. This updates the URL.
console.log(newURL.href); // Prints: https://example.org/?a=b&a=c

newSearchParams.delete('a');

newURL.search = newSearchParams; // assigns newURL.search to ''. This updates the URL.
console.log(newURL.href); // Prints: https://example.org/

/****************************************************************************************************/
/**
 * urlSearchParams.get(name)
 * urlSearchParams.getAll(name)
 * urlSearchParams.delete(name)
 * urlSearchParams.has(name)
 * urlSearchParams.toString()
 */
/****************************************************************************************************/

const params = new URLSearchParams();
params.append('foo', 'bar');
params.append('foo', 'baz');
console.log(params.has('abc')); // false
params.append('abc', 'def');
console.log(params.get('foo')); // bar
console.log(params.getAll('foo')); // [ 'bar', 'baz' ]
params.delete('foo');
console.log(params.toString()); // Prints: abc=def
console.log(params.has('abc')); // true

/****************************************************************************************************/
/** url.fileURLToPath(url) */
/****************************************************************************************************/

const fileURL = import.meta.url;
// Returns: 'file:///home/jayantasamaddar/Work/quick-reference/nodejs/modules/url/url.js'

const __filename = fileURLToPath(fileURL);
// Returns: '/home/jayantasamaddar/Work/quick-reference/nodejs/modules/url/url.js'
