// `process.stdin`
process.stdin.on('data', data => {
  console.log(`Typed: ${data}`);
  process.exit();
});

const returnMethods = (obj = array) => {
  const members = Object.getOwnPropertyNames(obj);
  const methods = members.filter(el => {
    return typeof obj[el] === 'function';
  });
  return methods;
};

console.log(returnMethods(Array.prototype));
