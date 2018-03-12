const express = require('express');
const router = express.Router();

const NewsService = require('../services/article-service');
const Source = require('../models/source-model');
const Article = require('../models/article-model');

router.get('/', async (req, res, next) => {
  res.send(await NewsService.findAll());
});

router.get('/all', async (req, res, next) => {
  const articles = await NewsService.findAll();
  res.render('article-all', { articles });
});

router.get('/all/:language', async (req, res, next) => {
  const sources = await Source.find({
    language: req.params.language
  }).populate('articles');

  const articles = [];

  for (const source of sources) {
    for (const article of source.articles) {
      articles.push(article);
    }
  }

  res.render('article-all-lang', { articles });
});

router.get('/:articleId', async (req, res, next) => {
  const article = await NewsService.find(req.params.articleId);
  res.render('article-detail', { article });
});

router.post('/', async (req, res, next) => {
  const article = await NewsService.add(req.body);
  res.send(article);
});

router.delete('/:articleId', async (req, res, next) => {
  await NewsService.del(req.params.articleId);
  res.send('ok');
});

module.exports = router;
