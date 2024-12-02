const db = require('../Database/connection');
const createBooksTable = require('../Migrations/Books')
const createUserTable = require('../Migrations/user')
const runDBMigration = async ()=>{
      console.log('BEGIN DB MIGRATION');
      const client = await db.connect();
      try {
            await client.query('BEGIN');
            await client.query(createBooksTable);
            await client.query(createUserTable);
            await client.query('COMMIT');

            console.log("END MIGRATION");
      } catch (e) {
            await client.query('ROLLBACK')
            console.error('Migration failed:', e.message);
      }finally{
      client.release();
      }
}
module.exports =runDBMigration;