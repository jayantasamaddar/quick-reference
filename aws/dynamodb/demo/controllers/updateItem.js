import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import db from '../connection/dynamodb.js';

export const updateItem = async (TableName, params = {}) => {
  try {
    if (
      !'TableName' in params ||
      !'Key' in params ||
      !'UpdateExpression' in params
    ) {
      return console.error('Params not provided');
    }
    const response = await db.send(
      new UpdateItemCommand({ TableName, ...params })
    );
    if (response?.['$metadata'].httpStatusCode === 200) {
      console.log(response.Attributes);
      return response;
    }
  } catch (err) {
    console.log('Error', err);
  }
};
