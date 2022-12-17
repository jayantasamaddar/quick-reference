import { CreateTableCommand } from '@aws-sdk/client-dynamodb';
import db from '../connection/dynamodb.js';

/**
 * Create Table
 * ------------
 *
 * Documentation:
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/createtablecommand.html
 */

export const createTable = async (tableName, createTableInput = {}) => {
  try {
    if (!tableName) return console.error('Please specify a table name');
    const rowName =
      typeof tableName === 'string' &&
      tableName.charAt(tableName.length - 1).toLowerCase() === 's'
        ? tableName.slice(0, tableName.length - 1).toLowerCase()
        : tableName.toLowerCase();

    const params = {
      TableName: tableName,
      AttributeDefinitions: [
        {
          AttributeName: `${rowName}_id`,
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: `${rowName}_id`,
          KeyType: 'HASH',
        },
      ],
      TableClass: 'STANDARD',
      BillingMode: 'PROVISIONED',
      ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2,
      },
      SSESpecification: 'AES256',
      ...createTableInput,
    };

    const response = await db.send(new CreateTableCommand(params));
    console.log(`Table Created: ${params.TableName}`);
    console.log(response);
    return response;
  } catch (err) {
    console.log('Error', err);
  }
};
