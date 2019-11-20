// Task 1
var str_reverse = require('./str_reverse');

var reversed1 = str_reverse('123456 78');
console.log(reversed1);

var reversed2 = str_reverse('test data');
console.log(reversed2);

// Task 2
var fs = require('fs');
var convertor = require('./csv-to-json');

var csvFilePath = __dirname + '/csv/example.csv';
var convertedFilesDir = __dirname + '/converted';
var jsonFilePath = convertedFilesDir + '/books.txt';
var streamJsonFilePath = __dirname + '/converted/books_stream.txt';

// Check if converted files direcroty exists
if (!fs.existsSync(convertedFilesDir)) {
  fs.mkdirSync(convertedFilesDir);
}

// First Example
convertor
  .convertCSVtoJSON(csvFilePath, jsonFilePath)
  .then(function(res) {
    console.log(res);
  })
  .catch(function(err) {
    console.error(err);
  });

// Second Example
convertor
  .convertCSVtoJSONStream(csvFilePath, streamJsonFilePath)
  .then(function(res) {
    console.log(res);
  })
  .catch(function(err) {
    console.error(err);
  });
