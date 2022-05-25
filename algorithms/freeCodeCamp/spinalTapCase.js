/**
 * Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.
 */

function spinalCase(str) {
  const arr = str.split('');
  const spliceArr = [0];
  arr.forEach((e, indx) => {
    if (
      e === e.toUpperCase() &&
      indx !== 0 &&
      arr[indx - 1] !== ' ' &&
      arr[indx - 1] !== '-' &&
      arr[indx - 1] !== '_' &&
      arr[indx - 1] === arr[indx - 1].toLowerCase()
    ) {
      spliceArr.push(indx);
    }
  });
  const spinal = spliceArr
    .reduce(
      (acc, a, i) => acc + arr.slice(a, spliceArr[i + 1]).join('') + '-',
      ''
    )
    .toLowerCase();
  return spinal
    .slice(0, spinal.length - 1)
    .replaceAll(' ', '-')
    .replaceAll('_', '-')
    .replaceAll('--', '-');
}

console.log(spinalCase('This Is Spinal Tap'));
console.log(spinalCase('Teletubbies say Eh-oh'));
console.log(spinalCase('The_Andy_Griffith_Show'));
console.log(spinalCase('thisIsSpinalTap'));
console.log(spinalCase('AllThe-small Things'));
