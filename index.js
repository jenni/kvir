const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// const Sources = require('./models/sources');
// const News = require('./models/news');

// const sources = new Sources();
// const news = new News(sources);

app.use(bodyParser.json());
app.set('view engine', 'pug');

const article = require('./routes/article');

app.use('/article', article);

app.get('/', (req, res, next) => {
  res.render('index');
});

app.listen(3030, () => {
  console.log('Server listening...');
});


// news.getAll()
