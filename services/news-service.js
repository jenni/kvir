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

async function add(article) {
  const allArticles = await findAll();
  const lastArticle = allArticles[allArticles.length - 1];
  const lastArticleId = lastArticle && lastArticle.id || 0;
  article.id = lastArticleId + 1;

  article = await News.create(article);

  allArticles.push(article);

  await saveAll(allArticles);

  return article;
}

async function del(id) {
  const allArticles = await findAll();
  const articleIndex = allArticles.findIndex(article => article.id == id);

  if (articleIndex < 0) return

  allArticles.splice(articleIndex, 1);

  saveAll(allArticles)
}

async function find(id) {
  const articles = await findAll();

  return articles.find(article => article.id == id);
}

function saveAll(article) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dbPath, JSON.stringify(article), (err, file) => {
      if (err) return reject(err)

      resolve()
    })
  })
}

module.exports = {
  findAll,
  find,
  add,
  del
}
