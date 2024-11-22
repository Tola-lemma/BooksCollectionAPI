const Router = require('express')
const router = Router();
const books  = require('../Controller/BooksController');
const getAllBooks = require('../Controller/GetAllBooks')
//API end-points
router.post('/books',books.createBooks)
router.get('/books',getAllBooks.GetAllBooks)
module.exports = router