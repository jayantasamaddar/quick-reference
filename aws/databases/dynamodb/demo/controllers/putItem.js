import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import db from '../connection/dynamodb.js';

export const putItem = async (TableName, payload = {}) => {
  try {
    if (
      typeof payload !== 'object' ||
      !'TableName' in payload ||
      !'Item' in payload
    ) {
      return console.error('payload not provided');
    }
    const response = await db.send(
      new PutItemCommand({ TableName, Item: payload })
    );
    if (response?.['$metadata'].httpStatusCode === 200) {
      console.log('Row inserted');
      console.log(response);
      return response;
    }
  } catch (err) {
    console.log('Error', err);
  }
};
