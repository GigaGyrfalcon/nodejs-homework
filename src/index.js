// Task 2

import fs from 'fs';
import { convertCSVtoJSON, convertCSVtoJSONStream } from './csv-to-json';

var csvFilePath = __dirname + '/csv/example.csv';
var convertedFilesDir = __dirname + '/converted';
var jsonFilePath = convertedFilesDir + '/books.txt';
var streamJsonFilePath = __dirname + '/converted/books_stream.txt';

// Check if converted files direcroty exists
if (!fs.existsSync(convertedFilesDir)) {
  fs.mkdirSync(convertedFilesDir);
}

const init = async () => {
  try {
    // First Example
    const res1 = await convertCSVtoJSON(csvFilePath, jsonFilePath);
    console.log(res1);

    // Second Example
    const res2 = await convertCSVtoJSONStream(csvFilePath, streamJsonFilePath);
    console.log(res2);
  } catch (error) {
    console.error(error);
  }
};

init();
