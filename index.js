const express = require('express');
const app = express();
const NewsService = require('./controllers/news-service');

const Sources = require('./models/sources');
const News = require('./models/news');

const sources = new Sources();
const news = new News(sources);

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/views/index.html');
  // res.send('Hello!');
});

app.get('/all', async (req, res, next) => {
  res.send(await NewsService.findAll());
});



app.listen(3030, () => {
  console.log('Server listening...');
});

