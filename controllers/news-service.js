const fs = require('fs');

const News = require('../models/news');

const dbPath = `${__dirname}/../data/news.json`

function findAll() {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf8', (err, file) => {
      if (err) return reject(err);

      const articles = JSON.parse(file).map(News.create);

      resolve(articles);
    });
  });
}

module.exports = {
  findAll,
  find,
  add,
  del
}
