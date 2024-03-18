const express = require("express");

const bookRouter = express.Router();
const { BookModel } = require("../model/book.model");
const { UserModel } = require("../model/user.module");
const {auth}=require("../middleware/auth.middleware")
const {roleAccess}=require("../middleware/authorization.middleware")

bookRouter.post("/add",auth,roleAccess(["Admin"]), async (req, res) => {
  try {
    const { title, author, ISBN } = req.body;
    const book = new BookModel({
      title,
      author,
      ISBN,
    });
    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all books
bookRouter.get("/",auth, async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to borrow a book
bookRouter.post("/borrow/:bookId", auth ,roleAccess(["Admin"]), async (req, res) => {
  try {
    const { bookId } = req.params;
    const { userId } = req.body;

    const book = await BookModel.findById(bookId);
    console.log(book)
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!book.availability) {
      return res
        .status(400)
        .json({ message: "Book is not available for borrowing" });
    }

    book.availability = false;
    book.owner = user._id;
    await book.save();

    res.status(200).json({ message: "Book borrowed successfully", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { bookRouter };
