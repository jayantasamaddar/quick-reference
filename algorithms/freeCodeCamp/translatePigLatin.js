function translatePigLatin(str) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  if (vowels.find(w => w === str[0])) {
    return str + 'way';
  }
  const indx = str.split('').findIndex(e => vowels.includes(e));
  return (
    str.slice(indx === -1 ? 0 : indx) +
    str.slice(0, indx === -1 ? 0 : indx) +
    'ay'
  );
}

console.log(translatePigLatin('consonant'));
console.log(translatePigLatin('rhythm'));
