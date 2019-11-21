import csv from 'csvtojson/v2';
import fs from 'fs';

// the file is loaded fully into the RAM
export const convertCSVtoJSON = (fromFile, toFile) =>
  new Promise(async (resolve, reject) => {
    const data = await csv().fromFile(fromFile);
    const formatedData = data
      .map(item => JSON.stringify(item))
      .reduce((a, b) => a + '\n' + b);
    fs.writeFile(toFile, formatedData, err => {
      if (err) reject('Something is wrong!');
      resolve('Successfully Written to File 1.');
    });
  });

// the file is not loaded fully in the RAM
export const convertCSVtoJSONStream = (fromFile, toFile) =>
  new Promise((resolve, reject) => {
    const errorHandling = () => reject('Something is wrong!');
    const success = () => resolve('Successfully Written to File 2.');
    const readableStream = fs
      .createReadStream(fromFile)
      .on('error', errorHandling)
      .on('close', success);
    const writableStream = fs
      .createWriteStream(toFile)
      .on('error', errorHandling)
      .on('close', success);
    readableStream.pipe(csv()).pipe(writableStream);
  });
