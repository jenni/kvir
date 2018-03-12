const express = require('express');
const router = express.Router();

const NewsService = require('../services/article-service');

router.get('/', async (req, res, next) => {
  res.send(await NewsService.findAll());
});

router.get('/all', async (req, res, next) => {
  const articles = await NewsService.findAll();
  res.render('article-all', { articles });
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
