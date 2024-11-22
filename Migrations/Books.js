const createBooksTable =`CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      isbn VARCHAR(13) UNIQUE NOT NULL,
      published_year INT NOT NULL,
      genre VARCHAR(100),
      language VARCHAR(50),
      publisher VARCHAR(255),
      page_count INT,
      edition VARCHAR(100),
      description TEXT,
      cover_img BYTEA,
      price NUMERIC(10, 2),
      currency VARCHAR(10),
      availability_status VARCHAR(50),
      favorite BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )`
  module.exports = createBooksTable;