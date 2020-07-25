const csv = require("csvtojson");
const fs = require('fs');

const csvFilePath = './csv/nodejs-hw1-ex1.xlsx'
// Convert a csv file with csvtojson

csv({output:"line"})
.fromString(csvFilePath)
.subscribe((csvLine)=>{ 
  console.log(csvLine);
})