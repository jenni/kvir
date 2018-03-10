const express = require('express');
const app = express();

const NewsService = require('./controllers/news-service');

const Sources = require('./models/sources');
const News = require('./models/news');

const sources = new Sources();
const news = new News(sources);

app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/article/all', async (req, res, next) => {
  const articles = await NewsService.findAll();
  res.render('article', { articles })
});

app.listen(3030, () => {
  console.log('Server listening...');
});
