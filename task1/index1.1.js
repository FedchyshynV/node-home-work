const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
});

reverseString = (str) => {
  const result = str.split("").reverse().join("");
  console.log(result);
}

rl.on('line', reverseString);

