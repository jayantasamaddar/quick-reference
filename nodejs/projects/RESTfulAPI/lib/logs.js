/**
 * Library for storing and rotating logs
 * -------------------------------------
 */

/** Dependencies */
import fs from 'fs';
import path from 'path';
import url from 'url';
import zlib from 'zlib';

// Solve for __dirname not defined in ES module scope. Not needed for CommonJS
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Container for the library
const lib = {};

// Base Directory
lib.baseDir = path.join(__dirname, '/../.logs');

// Append a string to a file. Create the file if it doesn't exist.
lib.append = (file, data, callback) => {
  fs.open(`${lib.baseDir}/${file}.log`, 'a', (err, fd) => {
    if (!err && fd) {
      // Stringify Data
      const logData = JSON.stringify(data);

      // Append to the file and close it.
      fs.appendFile(fd, logData + '\n', err => {
        if (!err) {
          fs.close(fd, err => {
            if (!err) {
              callback(false);
            } else callback('Error closing file that was being appended!');
          });
        } else callback('Could not append file.');
      });
    } else callback('Could not open file for appending.');
  });
};

// List all the logs and optionally include even compressed logs
lib.list = (includeCompressedLogs, callback) => {
  fs.readdir(lib.baseDir, (err, files) => {
    if (!err && files?.length) {
      const fileNames = [];
      for (const file of files) {
        // Add the .log files
        if (file.includes('.log')) {
          fileNames.push(file.replace('.log', ''));
        }

        // Add on the .gz files
        if (file.includes('.gz.b64') && includeCompressedLogs) {
          fileNames.push(file.replace('.gz.b64', ''));
        }
      }
      callback(false, fileNames);
    } else callback(err, files);
  });
};

// Compress the contents of a .log file into a .gz.b64 file
lib.compress = (logID, fileID, callback) => {
  const source = `${logID}.log`;
  const destination = `${fileID}.gz.b64`;

  fs.readFile(`${lib.baseDir}/${source}`, 'utf8', (err, logFileData) => {
    if (!err && logFileData) {
      // Compress the data using gzip
      zlib.gzip(logFileData, (err, buffer) => {
        if (!err && buffer) {
          // Send the data to the destination file
          fs.open(`${lib.baseDir}/${destination}`, 'wx', (err, fd) => {
            if (!err && fd) {
              // Write to destination file
              fs.writeFile(fd, buffer.toString('base64'), err => {
                if (!err) {
                  // Close file
                  fs.close(fd, err => {
                    if (!err) callback(false);
                    else callback('Error: Closing the file');
                  });
                } else callback(err);
              });
            } else callback(err);
          });
        } else callback(err);
      });
    } else callback(err);
  });
};

// Decompress the contents of a .gz.b64 file into a string variable
lib.decompress = (fileID, callback) => {
  const fileName = `${fileID}.gz.b64`;

  fs.readFile(`${lib.baseDir}/${fileName}`, 'utf8', (err, data) => {
    if (!err && data) {
      // Decompress the data
      const inputBuffer = Buffer.from(data, 'base64');
      zlib.unzip(inputBuffer, (err, outputBuffer) => {
        if (!err && outputBuffer) {
          // Callback
          const str = outputBuffer.toString();
          callback(false, str);
        }
        callback(err);
      });
    } else callback(err);
  });
};

// Truncate a log file
lib.truncate = (logID, callback) => {
  fs.truncate(`${lib.baseDir}/${logID}.log`, err => {
    if (!err) {
      callback(false);
    } else callback(err);
  });
};

// Exports
export default lib;
