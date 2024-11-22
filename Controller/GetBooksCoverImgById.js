const db = require('../Database/connection');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types'); 
exports.GetBookCoverImgById = async (req, res) => {
  const { id } = req.params;  
  const query = 'SELECT id, title, author, cover_img FROM books WHERE id = $1';  

  try {
    const result = await db.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Book not found' });  
    }
    
    const book = result.rows[0];

    if (book.cover_img) {
      if (Buffer.isBuffer(book.cover_img)) {
        const base64Image = book.cover_img.toString('base64');
        const mimeType = mime.lookup('jpg'); 
        res.setHeader('Content-Type', mimeType); 
        return res.status(200).send(Buffer.from(base64Image, 'base64')); 
      } 
    } else {
      return res.status(404).json({ message: 'No cover image found for this book' });
    }

  } catch (err) {
    console.error(err);  // Log error for debugging
    res.status(500).send({ message: err.message || 'Error while retrieving book information' });
  }
};
