import { createTable } from './controllers/createTable.js';
import { describeTable } from './controllers/describeTable.js';
import { listTables } from './controllers/listTables.js';
import { deleteTable } from './controllers/deleteTable.js';
import {
  putItem,
  getItem,
  updateItem,
  deleteItem,
} from './controllers/index.js';

/** Run Commands */
const run = async () => {
  //   const tableCreated = await createTable('Users');
  const itemsDescribed = await describeTable('Users');
  //   const tableDeleted = await deleteTable('Users');
  /**************************************************************/
  /** Put Item in a Table */
  /**************************************************************/
  //   const itemInserted = await putItem('Users', {
  //     user_id: { S: 'user-3' },
  //     first_name: { S: 'Amarpreet' },
  //     last_name: { S: 'Singh' },
  //     age: { N: '32' },
  //     profession: { S: 'DevOps Engineer' },
  //   });
  /**************************************************************/
  /** Update Item in a Table */
  /**************************************************************/
  //   const updatedItem = await updateItem('Users', {
  //     Key: {
  //       user_id: { S: 'user-2' },
  //     },
  //     ExpressionAttributeValues: {
  //       ':age': { N: '32' },
  //     },
  //     UpdateExpression: 'SET age=:age',
  //     ReturnValues: 'ALL_NEW',
  //   });
  /**************************************************************/
  /** Get an Item from a Table */
  /**************************************************************/
  //   const itemFetched = await getItem('Users', {
  //     Key: { user_id: { S: 'user-1' } },
  //   });
  //   const items = await listTables();
  /**************************************************************/
  /** Delete an Item from a Table */
  /**************************************************************/
  //   const itemDeleted = await deleteItem('Users', {
  //     Key: { user_id: { S: 'user-3' } },
  //     ReturnValues: 'ALL_OLD',
  //   });
};

run();
