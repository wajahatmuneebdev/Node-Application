import { createPool, Pool} from 'mysql';

let pool: Pool;

export const setupMysqlConnection = () => {
  try {
    pool = createPool({
        host:'localhost',
        user:'root',
        password:'rminvhbkve',
        multipleStatements: true
    });

    console.debug('MySql Adapter Pool generated successfully');
  } catch (error) {
    console.error(error);
    throw new Error('failed to initialized pool');
  }
};

export const execute = (query: string, params: string[] | Object): Promise<any> => {
  try {
    if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

    return new Promise((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

  } catch (error) {
    console.error(error);
    throw new Error('failed to execute MySQL query');
  }
};