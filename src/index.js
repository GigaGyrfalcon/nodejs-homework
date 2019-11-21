// Task 1
import str_reverse from './str_reverse';

var reversed1 = str_reverse('123456 78');
console.log(reversed1);

var reversed2 = str_reverse('test data');
console.log(reversed2);

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

// First Example
convertCSVtoJSON(csvFilePath, jsonFilePath)
  .then(function(res) {
    console.log(res);
  })
  .catch(function(err) {
    console.error(err);
  });

// Second Example
convertCSVtoJSONStream(csvFilePath, streamJsonFilePath)
  .then(function(res) {
    console.log(res);
  })
  .catch(function(err) {
    console.error(err);
  });
