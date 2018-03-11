const Article = require('../models/article-model');

async function findAll() {
  return Article.find();
}

async function find(id) {
  return Article.findOne({ id });
}

async function add(article) {
  return Article.create(article);
}

async function del(id) {
  return Article.remove({ id });
}

module.exports = {
  findAll,
  find,
  add,
  del
}
