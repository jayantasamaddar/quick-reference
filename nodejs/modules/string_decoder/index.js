import { StringDecoder } from 'string_decoder';

/****************************************************************************************************/
/** new StringDecoder([encoding]) */
/****************************************************************************************************/
const decoder = new StringDecoder('utf8'); // Default: 'utf8'

/****************************************************************************************************/
/** stringDecoder.end(buffer) */
/****************************************************************************************************/

decoder.write(Buffer.from([0xe2]));
decoder.write(Buffer.from([0x82]));
console.log(decoder.end(Buffer.from([0xac]))); // €

/****************************************************************************************************/
/** stringDecoder.write(buffer) */
/****************************************************************************************************/

const cent = Buffer.from([0xc2, 0xa2]);
console.log(decoder.write(cent)); // ¢

const euro = Buffer.from([0xe2, 0x82, 0xac]);
console.log(decoder.write(euro)); // €
decoder.end();
