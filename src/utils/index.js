const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');

const getFileNames = (location, extension = '.json') =>
  new Promise((resolve, reject) => {
    recursive(location, (err, files) => {
      if (err) return reject(err);
      const paths = files
        .filter(
          file =>
            fs.statSync(file).isFile() &&
            (extension === undefined || path.extname(file) === extension),
        )
        .sort();
      return resolve(paths);
    });
  });

const readFile = file =>
  new Promise((resolve, reject) =>
    fs.readFile(file, (err, data) => {
      if (err) return reject(err);
      return resolve(JSON.parse(data));
    }),
  );

module.exports = { getFileNames, readFile };
