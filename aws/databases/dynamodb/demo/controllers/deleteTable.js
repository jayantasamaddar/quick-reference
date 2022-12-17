import { DeleteTableCommand } from '@aws-sdk/client-dynamodb';
import db from '../connection/dynamodb.js';

/**
 * Delete Table
 * ------------
 *
 * Documentation:
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/deletetablecommand.html
 */

export const deleteTable = async TableName => {
  try {
    if (!TableName) return console.error('TableName is mandatory!');
    const response = await db.send(new DeleteTableCommand({ TableName }));
    console.log(`Table Deleting: ${TableName}`);
    console.log(response);
    return response;
  } catch (err) {
    console.log('Error', err);
  }
};
