const express=require('express');
const router= express.Router();
const Book = require('./book.model');
const {postBook,getAllBooks,getSingleBook,updateBook,deleteABook} = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');

router.post("/create-book",verifyAdminToken, postBook )
router.get("/", getAllBooks)
router.get("/:id",getSingleBook)
router.put("/edit/:id",verifyAdminToken,updateBook)
router.delete("/:id",verifyAdminToken,deleteABook)

module.exports= router;