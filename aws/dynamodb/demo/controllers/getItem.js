import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import db from '../connection/dynamodb.js';

export const getItem = async (TableName, query = {}) => {
  try {
    if (!TableName || !'Key' in query) {
      return console.log('TableName and query containing Key not provided');
    }
    const response = await db.send(new GetItemCommand({ TableName, ...query }));
    if (response?.['$metadata'].httpStatusCode === 200) {
      console.log(response.Item);
      return response.Item;
    }
  } catch (err) {
    console.log('Error', err);
  }
};
