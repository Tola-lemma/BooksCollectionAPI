// bookValidation.js
const { body } = require('express-validator');
const { validateIsbn } = require('./ISBNValidation'); 

// Validation rules for updating a book
const validateBookUpdate = [
  body('title').optional().notEmpty().withMessage('Title must be a valid string'),
  body('author').optional().notEmpty().withMessage('Author must be a valid string'),
  body('isbn')
    .optional()
    .notEmpty()
    .custom((isbn) => {
      if (!validateIsbn(isbn)) {
        throw new Error('Invalid ISBN. It must be a valid ISBN-10 or ISBN-13.');
      }
      return true;
    }),
  body('published_year')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('Published year must be between 1000 and current year'),
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
    .isIn(['ETB', 'USD', 'EUR', 'GBP', 'JPY'])
    .withMessage('Currency must be one of: ETB, USD, EUR, GBP, JPY'),
  body('availability_status')
    .optional()
    .isString()
    .isIn(['Available', 'Sold'])
    .withMessage('Availability status must be "Available" or "Sold"'),
  body('favorite').optional().isBoolean().withMessage('Favorite must be a boolean'),
  body('cover_img')
  .optional().notEmpty(),
];

module.exports = { validateBookUpdate };
