const db = require('../Database/connection');

exports.GetBookById = async (req, res) => {
  const { id } = req.params;  
  const query = 'SELECT * FROM books WHERE id = $1';  

  try {
    const result = await db.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Book not found' });  // Book not found
    }

    const book = result.rows[0];
   
    if (book.cover_img) {
      const fileName = `cover_${book.id}.jpg`; 
      book.cover_img = { fileName };  
    } else {
      book.cover_img = null;
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error while retrieving book information' });
  }
};
