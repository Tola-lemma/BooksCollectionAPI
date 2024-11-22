const db = require('../Database/connection');

exports.GetAllBooks = async (req, res) => {
  const query = 'SELECT * FROM books;';
  try {
    const result = await db.query(query);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No books found' });
    }
    const books = result.rows.map(book => {
      if (book.cover_img) {
        const fileName = `cover_${book.id}.jpg`; 
        book.cover_img = { fileName };  
      } else {
        book.cover_img = null; 
      }
      return book;
    });

    res.status(200).json(books);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error while retrieving book information' });
  }
};
