const mongoose = require('mongoose');

const SampleModel = mongoose.model('sample', {name: String})

exports.SampleModel = SampleModel;
