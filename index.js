const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const NewsService = require('./controllers/news-service');

const Sources = require('./models/sources');
const News = require('./models/news');

const sources = new Sources();
const news = new News(sources);

app.set('view engine', 'pug');

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/article/all', async (req, res, next) => {
  const articles = await NewsService.findAll();
  res.render('article', { articles })
});

app.post('/article', async (req, res, next) => {
  // console.log(req.body)
  const article = await NewsService.add(req.body);
  res.send(article);
});

app.get('/article/:id', async (req, res, next) => {
  const article = await NewsService.find(req.params.id);
  res.render('article-detail', { article });
})

app.delete('/article/:id', async (req, res, next) => {
  await NewsService.del(req.params.id);
  res.send('ok')
})

app.listen(3030, () => {
  console.log('Server listening...');
});


// news.getAll()
