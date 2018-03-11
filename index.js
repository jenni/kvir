const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('./db/database-connection');

// const Sources = require('./models/sources');
// const News = require('./models/news');

// const sources = new Sources();
// const news = new News(sources);

app.use(bodyParser.json());

app.use(cookieParser());
app.set('view engine', 'pug');

const article = require('./routes/article');

app.use('/article', article);

app.get('/', (req, res, next) => {
  res.render('index');
});

app.listen(3030, () => {
  console.log('Server listening...');
});

