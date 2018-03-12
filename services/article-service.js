const Article = require('../models/article-model');

async function findAll() {
  return Article.find().populate('sources');
}

async function find(articleId) {
  return Article.findOne({ articleId }).populate('sources');
}

async function add(article) {
  return Article.create(article);
}

async function del(articleId) {
  return Article.remove({ articleId });
}

module.exports = {
  findAll,
  find,
  add,
  del
}
