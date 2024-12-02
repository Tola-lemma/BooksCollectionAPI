const createUserTable = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20)  NOT NULL CHECK (role IN ('admin','user','superadmin')), 
    created_at TIMESTAMP DEFAULT NOW()
  )`;
  module.exports = createUserTable;  
