const mongoose = require('mongoose');

const BooksModel = mongoose.model('Books', {
  user_id: String,
  section_name:String,
  color:String,
  entries : {}
})

exports.BooksModel = BooksModel;
