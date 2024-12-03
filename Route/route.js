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
//middleware
const generalAuth = require('../Middleware/AuthMiddleware/GeneralAuth')
const AdminAuth = require('../Middleware/AuthMiddleware/AdminAuthMiddleware')
const UserAuth = require('../Middleware/AuthMiddleware/UserAuthMiddleware')
const superAdminAuth = require('../Middleware/AuthMiddleware/SuperAdmin')
//API end-points
//admin only
router.post('/books',generalAuth,AdminAuth,books.createBooks)
router.get('/books',generalAuth,AdminAuth,getAllBooks.GetAllBooks)
router.delete('/books/:id',generalAuth,AdminAuth,deleteBooksById.deleteBookById)
router.put('/books/:id',generalAuth,AdminAuth,updateBookById.updateBookById)
//all
router.get('/books/:id',generalAuth,getBooksById.GetBookById) 
router.get('/books/best/recommendations',generalAuth,bookrecommendation.bookRecommendation)
//user only
router.get('/books/cover/:id',generalAuth,UserAuth,coverImg.GetBookCoverImgById)
router.put('/books/add/favorite/:id',generalAuth,UserAuth,addToFavorite.AddtoFavoriteList)
router.put('/books/unfavorite/:id',generalAuth,UserAuth,Unfavorite.Unfavorite)
router.get('/books/get/favorite',generalAuth,UserAuth,FavoriteList.FavoriteLists)

//user route
const user = require('../Controller/UserController/userController')
router.post('/auth/signup',user.CreateUser)
router.post('/auth/login',user.UserLogin)
//superadmin only
router.get('/auth/users',generalAuth,superAdminAuth,user.getAllUser)
router.delete('/auth/delete/user/:id',generalAuth,superAdminAuth,user.deleteUser)
module.exports = router