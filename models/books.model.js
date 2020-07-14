const mongoose = require('mongoose');

const BooksModel = mongoose.model('Books', {
  user_id: String,
  sections:{
    name:String,
    meta:{
      created:String,
      entry:String
    },
    entries : {},
  }
})

exports.BooksModel = BooksModel;
