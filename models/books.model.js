const mongoose = require('mongoose');

const BooksModel = mongoose.model('Books', {
  user_id: String,
  sections:{
    name:String,
    count:Number,
    entries : {

    }
  }
})

exports.BooksModel = BooksModel;
