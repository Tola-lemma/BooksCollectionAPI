const db = require('../Database/connection')
const multer = require('multer');

const { validateBook, checkValidationResult } = require('../Validations/AllInputValidations')
const {normalizeIsbn} = require('../Validations/isbnNormalization')
// Set up multer for image upload (in-memory storage for this example)
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
    const fileUploadMiddleware = 
exports.createBooks = [
      upload.single('cover_img'),
      // Handle Multer fileFilter errors
      (err, req, res, next) => {
        if (err instanceof multer.MulterError || err.message.includes('Invalid file type')) {
          return res.status(400).json({ message: err.message });
        }
        next();
      },
      validateBook,
      checkValidationResult,
    
      // Main controller logic
      async (req, res) =>{ 
      const { 
            title, 
            author, 
            isbn, 
            published_year, 
            genre, 
            language, 
            publisher, 
            page_count, 
            edition, 
            description, 
            price, 
            currency,
            availability_status, 
            favorite,  
          } = req.body;
          const normalizedIsbn = normalizeIsbn(isbn);
          const currentYear = new Date().getFullYear();
      const coverImgData = req.file ? req.file.buffer : null; 
      const query = `INSERT INTO books (title, author, isbn, published_year, genre, language, publisher, 
          page_count, edition, description, price,currency, availability_status, favorite, cover_img
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
       RETURNING *;`;
       try {
            const existingBooks = await db.query('SELECT * FROM books WHERE isbn = $1', [isbn]);
            if (existingBooks.rows.length > 0) {
              return res.status(409).send({ message: 'Books already exists.' });
            }
           const result = await db.query(query, [
             title,
             author,
             normalizedIsbn,
             published_year || currentYear,
             genre || "",
             language || "English",
             publisher || "",
             page_count || 1,
             edition || "1st",
             description || "",
             price || 0,
             currency || "ETB", // Default to 'ETB' if no currency is provided
             availability_status || "Available",
             favorite || false,
             coverImgData,
           ]);
                const { cover_img, ...bookWithoutCoverImg } = result.rows[0];
                res.status(201).json({ 
                  success: true, 
                  message: 'Book added successfully to the collection!',
                  book: bookWithoutCoverImg,
                });
       } catch (err) {
            res.status(500).send({ message: err.message || 'Error while creating Books information' }); 
       }
}];