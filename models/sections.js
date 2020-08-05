const mongoose = require('mongoose');

const SectionModel = mongoose.model('Sections', {user_id:String, sections:{
  section_id: String,
  name: String,
  entry: Number }})

exports.SectionModel = SectionModel;
