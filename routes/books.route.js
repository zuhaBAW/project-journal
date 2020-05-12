const auth = require("../middleware/auth");
const { BooksModel } = require("../models/books.model");
const express = require("express");
const router = express.Router();

router.get("/create-section", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.findById(req.user._id);
  res.send(books)
});

router.get("/delete-section", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.findById(req.user._id);
  res.send(books)
});

router.get("/create-entry", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.findById(req.user._id);
  res.send(books)
});

router.get("/delete-entry", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.findById(req.user._id);
  res.send(books)
});

router.get("/update-entry", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.findById(req.user._id);
  res.send(books)
});

module.exports = router;
