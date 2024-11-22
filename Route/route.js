const Router = require('express')
const router = Router();
const books  = require('../Controller/BooksController');
const getAllBooks = require('../Controller/GetAllBooks')
const getBooksById = require('../Controller/GetBooksById')
const coverImg = require('../Controller/GetBooksCoverImgById')
//API end-points
router.post('/books',books.createBooks)
router.get('/books',getAllBooks.GetAllBooks)
router.get('/books/:id?',getBooksById.GetBookById) 
router.get('/books/cover/:id',coverImg.GetBookCoverImgById)
module.exports = router