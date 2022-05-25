function palindrome(str) {
  const parsedStr = str.toLowerCase().replaceAll(/[^a-z0-9]/gi, '');
  return parsedStr === parsedStr.split('').reverse().join('');
}

console.log(palindrome('eye'));
console.log(palindrome('2A3*3a2'));
console.log(palindrome('0_0 (: /- :) 0-0'));
console.log(palindrome('My age is 0, 0 si ega ym.'));
