const Source = require('../models/source-model');

async function findAll() {
  return Source.find();
}

async function find(id) {
  return Source.findOne({ id });
}

async function add(article) {
  return Source.create(article);
}

async function del(id) {
  return Source.remove({ id });
}

module.exports = {
  findAll,
  find,
  add,
  del
}
