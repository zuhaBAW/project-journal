const mongoose = require('mongoose');

const EntryModel = mongoose.model('Entry', {section_id:String,
  section_name:String,
  entries:{
    name:String,
    location:String
  }})

exports.EntryModel = EntryModel;
