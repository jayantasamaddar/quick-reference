import { ListTablesCommand } from '@aws-sdk/client-dynamodb';
import db from '../connection/dynamodb.js';

export const listTables = async (query = {}) => {
  try {
    const results = await db.send(new ListTablesCommand(query));
    if (response?.['$metadata'].httpStatusCode === 200) {
      console.log(response.TableNames.join('\n'));
      return response.TableNames.join('\n');
    }
  } catch (err) {
    console.error('Error', err);
  }
};
