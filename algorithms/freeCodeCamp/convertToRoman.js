function convertToRoman(num) {
  const romanNumbers = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M',
  };
  let roman = '';
  const generateRoman = num => {
    if (num === 0) return roman;

    if (num >= 1000 && num < 4000) {
      const limit = Math.floor(num / 1000);
      for (let i = 0; i < limit; i++) {
        roman += romanNumbers[1000];
      }
      return generateRoman(num % 1000);
    }

    if (num >= 500 && num < 900) {
      roman += romanNumbers[500];
      return generateRoman(num % 500);
    }

    if (num >= 100 && num < 400) {
      const limit = Math.floor(num / 100);
      for (let i = 0; i < limit; i++) {
        roman += romanNumbers[100];
      }
      return generateRoman(num % 100);
    }

    if (num >= 50 && num < 90) {
      roman += romanNumbers[50];
      return generateRoman(num % 50);
    }

    if (num >= 10 && num < 40) {
      const limit = Math.floor(num / 10);
      for (let i = 0; i < limit; i++) {
        roman += romanNumbers[10];
      }
      return generateRoman(num % 10);
    }

    if (num >= 5 && num < 9) {
      roman += romanNumbers[5];
      return generateRoman(num % 5);
    }

    if (num >= 1 && num < 4) {
      for (let i = 0; i < num; i++) {
        roman += romanNumbers[1];
      }
      return generateRoman(0);
    }

    /**
     * Handle Exceptions: The number preceding a roman numeral has a special case.
     * E.g. 44 is written as XLIV and not XXXXIIII.
     * This is done by 40 + 4: 40 is XL and 4 is IV.
     */
    const romanKeys = Object.keys(romanNumbers);
    const closeIndx = romanKeys.findIndex(n => n > num);

    if (closeIndx !== -1) {
      const firstIndx = closeIndx % 2 === 0 ? closeIndx : closeIndx + 1;

      roman +=
        romanNumbers[Math.ceil(romanKeys[firstIndx] / 10)] +
        romanNumbers[romanKeys[closeIndx]];

      return generateRoman(num % Math.ceil(romanKeys[firstIndx] / 10));
    }
  };
  return generateRoman(num);
}

console.log(convertToRoman(2)); // II
console.log(convertToRoman(3)); // III
console.log(convertToRoman(4)); // IV
console.log(convertToRoman(5)); // V
console.log(convertToRoman(9)); // IX
console.log(convertToRoman(12)); // XII
console.log(convertToRoman(16)); // XVI
console.log(convertToRoman(29)); // XXIX
console.log(convertToRoman(44)); // XLIV
console.log(convertToRoman(45)); // XLV
console.log(convertToRoman(68)); // LXVIII
console.log(convertToRoman(83)); // LXXXIII
console.log(convertToRoman(97)); // XCVII
console.log(convertToRoman(99)); // XCIX
console.log(convertToRoman(110)); // CX
console.log(convertToRoman(400)); // CD
console.log(convertToRoman(500)); // D
console.log(convertToRoman(501)); // DI
console.log(convertToRoman(649)); // DCXLIX
console.log(convertToRoman(798)); // DCCXCVIII
console.log(convertToRoman(891)); // DCCCXCI
console.log(convertToRoman(989)); // CMLXXXIX
console.log(convertToRoman(1000)); // M
console.log(convertToRoman(1004)); // MIV
console.log(convertToRoman(1006)); // MVI
console.log(convertToRoman(1023)); // MXXIII
console.log(convertToRoman(2014)); // MMXIV
console.log(convertToRoman(3999)); // MMMCMXCIX
