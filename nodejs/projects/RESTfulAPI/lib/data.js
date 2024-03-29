/**
 * Library for storing and editing data
 */

// Dependencies
import fs from 'fs';
import path from 'path';
import helpers from './helpers.js';

// Solve for __dirname not defined in ES module scope. Not needed for CommonJS
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Container for this module (to be exported)
const lib = {};

// Base Directory
lib.baseDir = path.join(__dirname, '../.data/');

// Write data to file
lib.create = (dir, file, data, callback) => {
  // Open the file for writing: (wx is a flag)
  fs.open(`${lib.baseDir}${dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // Convert data to string (JSON.stringify(object))
      const dataString = JSON.stringify(data, null, 2);

      fs.writeFile(fileDescriptor, dataString, err => {
        if (!err) {
          fs.close(fileDescriptor, err => {
            if (!err) {
              callback(false);
            } else callback('Error closing new file');
          });
        } else callback('Error, writing to new file');
      });
    } else {
      callback('Could not create new file, it may already exist');
    }
  });
};

// Read data from a file
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.baseDir}${dir}/${file}.json`, (err, data) => {
    if (!err && data) {
      const parsedData = helpers.parseJSONToObject(data);
      callback(false, parsedData);
    } else callback(err, data);
  });
};

// Search files with criteria. Default list all files in a directory.
lib.search = (dir, criteria, callback) => {
  fs.readdir(`${lib.baseDir}${dir}`, {}, (err, files) => {
    if (!err && files) {
      const entries =
        typeof criteria === 'object' ? Object.entries(criteria) : [];

      if (entries.length === 0) {
        callback(false, files);
      } else {
        // Filter the files
        const results = files.filter(file => {
          const fileData = JSON.parse(
            fs.readFileSync(
              `${lib.baseDir}${dir}/${file}`,
              'utf8',
              (err, data) => {
                if (!err && data) return data;
                else console.log({ error: err.message });
              }
            )
          );
          // Match criteria
          for (const entry of entries) {
            if (fileData[entry[0]] !== entry[1]) return false;
          }
          return true;
        });
        // Return the search results
        callback(false, results);
      }
    } else callback(err, files);
  });
};

// Update data to a file
lib.update = (dir, file, data, callback) => {
  // Open the file for writing. Flag 'r+': Open up for writing, error if doesn't exist
  fs.open(`${lib.baseDir}${dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // Convert data to a string
      const dataString = JSON.stringify(data, null, 2);

      // Truncate the file
      fs.ftruncate(fileDescriptor, err => {
        if (!err) {
          // Write to the file and close it
          fs.writeFile(fileDescriptor, dataString, err => {
            if (!err) {
              fs.close(fileDescriptor, err => {
                if (!err) {
                  callback(false);
                } else callback('Error closing the file');
              });
            } else callback('Error writing to an existing file');
          });
        } else callback('Error truncating file');
      });
    } else {
      callback('Could not open the file for updating, it may not exist yet');
    }
  });
};

// Delete a file
lib.delete = (dir, file, callback) => {
  // Unlinking: Removing the file from the file system
  fs.unlink(`${lib.baseDir}${dir}/${file}.json`, err => {
    if (!err) {
      callback(false);
    } else callback('Error deleting file');
  });
};

export default lib;
