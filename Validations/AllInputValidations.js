
const { body,validationResult  } = require('express-validator');
const { validateIsbn } = require('./ISBNValidation'); // Import the ISBN validation function
const currentYear = new Date().getFullYear();
const validCurrencies = ['ETB', 'USD', 'EUR', 'GBP', 'JPY'];  
const validateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('isbn')
    .notEmpty()
    .withMessage('ISBN is required')
    .custom((isbn) => {
      if (!validateIsbn(isbn)) {
        throw new Error('Invalid ISBN. It must be a valid ISBN-10 or ISBN-13.');
      }
      return true;
    }),
  body('published_year').isInt({ min: 1000, max: currentYear }).withMessage(`Published year must be between 1000 and ${currentYear}`),
  body('genre').optional().isString().withMessage('Genre must be a valid string'),
  body('language').optional().isString().withMessage('Language must be a valid string'),
  body('publisher').optional().isString().withMessage('Publisher must be a valid string'),
  body('page_count').optional().isInt({ min: 1 }).withMessage('Page count must be a positive integer'),
  body('edition').optional().isString().withMessage('Edition must be a valid string'),
  body('description').optional().isString().withMessage('Description must be a valid string'),
  body('price').optional().isDecimal({ decimal_digits: '2' }).withMessage('Price must be a valid decimal with two digits'),
  body('currency')
  .optional()
  .isString()
  .isIn(validCurrencies)
  .withMessage(`Currency must be one of: ${validCurrencies.join(', ')}.`),
  body('availability_status').optional().isString().isIn(['Available', 'Sold']).withMessage('Availability status must be "Available" or "Sold"'),
  body('favorite').optional().isBoolean().withMessage('Favorite must be a boolean'),
  body('cover_img')
  .optional()
  .custom((value, { req }) => {
    // If no file is uploaded, pass the validation (optional field)
    if (!req.file) {
      return true;
    }
    // Validate the MIME type of the uploaded file
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    console.log(req.file.mimetype);
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      throw new Error(
        `Invalid file type. Only JPEG, PNG, and GIF formats are allowed. You uploaded: ${req.file.mimetype}`
      );
    }
    return true;
  }),
];
// Check for validation errors
const checkValidationResult = (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    };
module.exports = { validateBook ,checkValidationResult };