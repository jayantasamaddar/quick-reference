import { DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import db from '../connection/dynamodb.js';

export const deleteItem = async (TableName, query) => {
  try {
    const response = await db.send(
      new DeleteItemCommand({ TableName, ...query })
    );
    if (response?.['$metadata'].httpStatusCode === 200) {
      console.log(response);
      return response;
    }
  } catch (err) {
    console.log('Error', err);
  }
};
