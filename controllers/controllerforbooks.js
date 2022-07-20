const Book = require("../model/Book");


const getAllBooks = async (req, res, next) => {
    let books;
    try {
        books = await Book.find();
    } catch (err) {
        console.log(err)
    }
    if (!books) {
        return res.status(404).json({ message: "No books found" });
    }
    return res.status(200).json({ books });
}

const getBookById = async (req, res, next) => {
    const id = req.params.id
    let book;
    try {
        book = await Book.findById(id);
    } catch (err) {
        console.log(err)
    }
    if (!book) {
        return res.status(404).json({ message: "No books found" });
    }
    return res.status(200).json({ book });
}

const addNewBooks = async (req, res, next) => {
    const { bookName, authorName, price, description, available, image } = req.body;
    let book;
    try {
        const existingBookName = await Book.findOne({bookName: req.body.bookName});
        if(existingBookName){
            return res.status(400).json("Book name already exists!");
        }
        book = new Book({
            bookName,
            authorName,
            price,
            description,
            available,
            image
        });
        await book.save();
    } catch (err) {
        console.log(err);
    }
    if (!book) {
        return res.status(500).json("Unable to add")
    }
    return res.status(201).json("New book added successfully");
}

const updateBook = async (req,res,next)=>{
    const id = req.params.id;
    const { bookName, authorName, price, description, available, image } = req.body;
    let book;
    try {
        book = await Book.findByIdAndUpdate(id,{
            bookName,
            authorName,
            price,
            description,
            available,
            image
        });
        book = await book.save();
    } catch (err) {
        console.log(err);
    }
    if (!book) {
        return res.status(404).json("Unable to update this id")
    }
    return res.status(200).json("Book Updated successfully");
}

const deleteBookById = async(req,res,next)=>{
    const id = req.params.id;
    let book;
    try {
        book = await Book.findByIdAndRemove(id);
    } catch (err) {
        console.log(err);
    }
    if (!book) {
        return res.status(404).json({ message: "Unable to delete this id" })
    }
    return res.status(200).json("Deleted successfully");
}

module.exports = { getAllBooks, addNewBooks, getBookById, updateBook, deleteBookById};
