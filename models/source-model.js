const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const sourceSchema = new Schema({
  name: String,
  description: String,
  url: String,
  category: String,
  language: String,
  country: String
});

sourceSchema.plugin(AutoIncrement, { inc_field: 'sourceId' });

module.exports = mongoose.model('Source', sourceSchema);
