const express = require('express');
const router = express.Router();
const Book = require("../model/Book");
const booksController = require("../controllers/controllerforbooks");

router.get("/get", booksController.getAllBooks);
router.post("/addnew", booksController.addNewBooks);
router.get("/get/:id", booksController.getBookById);
router.put("/update/:id",booksController.updateBook);
router.delete("/delete/:id",booksController.deleteBookById);

module.exports =  router;