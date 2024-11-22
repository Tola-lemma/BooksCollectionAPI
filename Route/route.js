const Router = require('express')
const router = Router();
const books  = require('../Controller/BooksController');

//API end-points
router.post('/books',books.createBooks)

module.exports = router