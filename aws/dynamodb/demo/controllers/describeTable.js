import { DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import db from '../connection/dynamodb.js';

export const describeTable = async TableName => {
  try {
    const response = await db.send(new DescribeTableCommand({ TableName }));
    if (response?.['$metadata'].httpStatusCode === 200) {
      const result = JSON.parse(JSON.stringify(response.Table, null, 2));
      console.log(result);
      return result;
    }
  } catch (err) {
    console.log('Error', err);
  }
};
