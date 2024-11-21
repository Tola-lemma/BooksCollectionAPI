const db = require('../Database/connection');

const runDBMigration = async ()=>{
      console.log('BEGIN DB MIGRATION');
      const client = await db.connect();
      try {
            await client.query('BEGIN');
            
            await client.query('COMIT');

            console.log("END MIGRATION");
      } catch (e) {
            await client.query('ROLLBACK')
      }finally{
      client.release();
      }
}
module.exports =runDBMigration;