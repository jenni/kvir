const Article = require('../models/article-model');

async function findAll() {
  return Article.find();
}

async function find(articleId) {
  return Article.findOne({ articleId });
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
