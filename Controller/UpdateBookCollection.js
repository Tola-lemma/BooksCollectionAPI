const { validateBookUpdate } = require('../Validations/ValidateBookUpdate');
const { validationResult } = require('express-validator');
const db = require('../Database/connection');
const multer = require('multer');
const {normalizeIsbn} = require('../Validations/isbnNormalization')
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and GIF are allowed.'));
    }
    cb(null, true); 
  },
});
exports.updateBookById = [
  upload.single('cover_img'),
   // Handle Multer fileFilter errors
   (err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message.includes('Invalid file type')) {
      return res.status(400).json({ message: err.message });
    }
    next();
  },
  validateBookUpdate, 
  async (req, res) => {
    const errors = validationResult(req);

    // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const {
      title, author, isbn, published_year, genre, language, publisher, page_count,
      edition, description, price, currency, availability_status, favorite
    } = req.body;

    try {
    
      const bookCheckQuery = 'SELECT * FROM books WHERE id = $1';
      const bookCheckResult = await db.query(bookCheckQuery, [id]);

      if (bookCheckResult.rows.length === 0) {
        return res.status(404).json({ message: 'Book not found' });
      }
  // If ISBN is provided, check for duplicates
  if (isbn) {
    const normalizedIsbn = normalizeIsbn(isbn);
    const isbnCheckQuery = 'SELECT * FROM books WHERE isbn = $1 AND id != $2';
    const isbnCheckResult = await db.query(isbnCheckQuery, [normalizedIsbn, id]);

    if (isbnCheckResult.rows.length > 0) {
      return res.status(400).json({ message: 'ISBN already exists for another book.' });
    }
  }
      const query = `
        UPDATE books SET
          title = COALESCE($1, title),
          author = COALESCE($2, author),
          isbn = COALESCE($3, isbn),
          published_year = COALESCE($4, published_year),
          genre = COALESCE($5, genre),
          language = COALESCE($6, language),
          publisher = COALESCE($7, publisher),
          page_count = COALESCE($8, page_count),
          edition = COALESCE($9, edition),
          description = COALESCE($10, description),
          price = COALESCE($11, price),
          currency = COALESCE($12, currency),
          availability_status = COALESCE($13, availability_status),
          favorite = COALESCE($14, favorite),
          cover_img = COALESCE($15, cover_img),
          updated_at = COALESCE($16, updated_at)
        WHERE id = $17
        RETURNING *;
      `;
      const normalizedIsbn = isbn ? normalizeIsbn(isbn) : null;
      const coverImgData = req.file ? req.file.buffer : null; 
      const updatedDay = new Date().toISOString();
      const result = await db.query(query, [
        title, author, normalizedIsbn, published_year, genre, language, publisher, page_count,
        edition, description, price, currency, availability_status, favorite,coverImgData, updatedDay, id
      ]);

      if (result.rows.length === 0) {
        return res.status(500).json({ message: 'Failed to update the book.' });
      }
      const newUpdatedBook = result.rows[0];
   
      if (newUpdatedBook.cover_img) {
        const fileName = `cover_${newUpdatedBook.id}.jpg`; 
        newUpdatedBook.cover_img = { fileName };  
      } else {
        newUpdatedBook.cover_img = null;
      }
      res.status(200).json({ message: 'Book updated successfully.', updatedBook: newUpdatedBook });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error while updating book information.' });
    }
  }
];
