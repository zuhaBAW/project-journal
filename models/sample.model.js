const mongoose = require('mongoose');

const SampleModel = mongoose.model('sample', {user_id: String, name: String, age: String})

exports.SampleModel = SampleModel;
