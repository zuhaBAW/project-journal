const mongoose = require('mongoose');

const BooksModel = mongoose.model('Books', {user_id: String, sections:{
  "name":String,
  "meta":{
    "created":String,
    "entries":[]
  },
   "entries": {}}
 })

exports.BooksModel = BooksModel;
