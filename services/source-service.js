const Source = require('../models/source-model');

async function findAll() {
  return Source.find();
}

async function find(sourceId) {
  return Source.findOne({ sourceId });
}

async function add(article) {
  return Source.create(article);
}

async function del(sourceId) {
  return Source.remove({ sourceId });
}

module.exports = {
  findAll,
  find,
  add,
  del
}
