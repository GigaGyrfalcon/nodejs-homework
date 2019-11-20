var csv = require('csvtojson/v2');
var fs = require('fs');

// the file is loaded fully into the RAM
function convertCSVtoJSON(fromFile, toFile) {
  return new Promise(function(resolve, reject) {
    csv()
      .fromFile(fromFile)
      .then(function(data) {
        var formatedData = data
          .map(function(item) {
            return JSON.stringify(item);
          })
          .reduce(function(a, b) {
            return a + '\n' + b;
          });
        fs.writeFile(toFile, formatedData, function(err) {
          if (err) reject('Something is wrong!');
          resolve('Successfully Written to File 1.');
        });
      })
      .catch(function() {
        reject('Something is wrong!');
      });
  });
}

// the file is not loaded fully in the RAM
function convertCSVtoJSONStream(fromFile, toFile) {
  return new Promise(function(resolve, reject) {
    var errorHandling = function() {
      reject('Something is wrong!');
    };
    var success = function() {
      resolve('Successfully Written to File 2.');
    };
    var readableStream = fs
      .createReadStream(fromFile)
      .on('error', errorHandling)
      .on('close', success);
    var writableStream = fs
      .createWriteStream(toFile)
      .on('error', errorHandling)
      .on('close', success);
    readableStream.pipe(csv()).pipe(writableStream);
  });
}

module.exports.convertCSVtoJSON = convertCSVtoJSON;
module.exports.convertCSVtoJSONStream = convertCSVtoJSONStream;
