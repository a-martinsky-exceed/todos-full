const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
  text: {type: String, require: true, max: 100, trim: true},
  isChecked: {type: Boolean, require: false, default: false}
});

module.exports = mongoose.model('Item', ItemSchema);
