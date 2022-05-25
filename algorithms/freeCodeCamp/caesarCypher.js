/**
 * Caesars Cipher
 * ---------------
 * One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher.
 * In a shift cipher the meanings of the letters are shifted by some set amount.
 * A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places.
 * Thus A ↔ N, B ↔ O and so on.
 * Write a function which takes a ROT13 encoded string as input and returns a decoded string.
 * All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.
 */

function rot13(str) {
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const strArr = str.split('');
  let i = 0;
  let finalStr = '';
  while (i < strArr.length) {
    if (strArr[i].match(/^[A-Z]+$/)) {
      const indexChange = 26 - alphabets.indexOf(strArr[i]);
      const alphabet =
        indexChange > 13
          ? alphabets[alphabets.indexOf(strArr[i]) + 13]
          : alphabets[13 - indexChange];
      finalStr += alphabet;
    } else finalStr += strArr[i];
    i++;
  }
  return finalStr;
}

console.log(rot13('SERR PBQR PNZC'));
