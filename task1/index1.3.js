import { createInterface } from "readline";
import csv from "csvtojson";
import fs from "fs";

// task 1.1
const rl = createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  const result = line.split("").reverse().join("");
  console.log(result);
});

//task1.2
const csvFilePath = "./csv/nodejs-hw1-ex1.csv";
const txtFilePath = "./csv/nodejs-hw1-ex1.txt";

fs.writeFile(txtFilePath, "", (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

csv({
  checkType: true,
})
  .fromFile(csvFilePath)
  .subscribe(
    (resp) => {
      fs.appendFile(txtFilePath, JSON.stringify(resp) + "\n", (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    },
    (err) => {
      console.log(err);
    }
  );
