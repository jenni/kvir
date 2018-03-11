const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  source: Object,
  author: {
    type: String,
    default: 'anonymous'
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
  publishedAt: Date
});

articleSchema.plugin(AutoIncrement, { inc_field: 'articleId' });

module.exports = mongoose.model('Article', articleSchema);
