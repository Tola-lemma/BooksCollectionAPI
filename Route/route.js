const Router = require('express')
const router = Router();
const books  = require('../Controller/BooksController');
const getAllBooks = require('../Controller/GetAllBooks')
const getBooksById = require('../Controller/GetBooksById')
const coverImg = require('../Controller/GetBooksCoverImgById')
const bookrecommendation = require('../Controller/BooksRecommendations')
const deleteBooksById = require('../Controller/deleteBookById')
const updateBookById = require('../Controller/UpdateBookCollection')
const addToFavorite = require('../Controller/AddtoFavoriteList')
const Unfavorite = require('../Controller/Unfavorite')
const FavoriteList = require('../Controller/FavoriteList')
//API end-points
router.post('/books',books.createBooks)
router.get('/books',getAllBooks.GetAllBooks)
router.get('/books/:id',getBooksById.GetBookById) 
router.get('/books/cover/:id',coverImg.GetBookCoverImgById)
router.get('/books/best/recommendations',bookrecommendation.bookRecommendation)
router.delete('/books/:id',deleteBooksById.deleteBookById)
router.put('/books/:id',updateBookById.updateBookById)
router.put('/books/add/favorite/:id',addToFavorite.AddtoFavoriteList)
router.put('/books/unfavorite/:id',Unfavorite.Unfavorite)
router.get('/books/get/favorite',FavoriteList.FavoriteLists)

//user route
const signup = require('../Controller/UserController/userController')
router.post('/auth/signup',signup.CreateUser)
router.post('/auth/login',signup.UserLogin)
module.exports = router