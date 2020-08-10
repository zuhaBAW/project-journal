const mongoose = require('mongoose');

const SectionModel = mongoose.model('Sections',{ user_id : String, sections :{}})

exports.SectionModel = SectionModel;
