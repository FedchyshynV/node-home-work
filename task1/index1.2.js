const csv = require("csvtojson");
const fs = require("fs");

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
