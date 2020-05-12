const mongoose = require('mongoose');

const BooksModel = mongoose.model('Books', {user_id: String, sections: {}, meta: {}})

exports.BooksModel = BooksModel;
