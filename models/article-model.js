const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  source: {
    id: String,
    name: String
  },
  author: {
    type: String,
    default: 'unknown'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  sources: {
    type: Schema.Types.ObjectId,
    ref: 'Source'
  }
});

articleSchema.plugin(AutoIncrement, { inc_field: 'articleId' });

module.exports = mongoose.model('Article', articleSchema);
