const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const scheduler = require('node-schedule');
require('./db/database-connection');

app.use(bodyParser.json());

app.use(cookieParser());
app.set('view engine', 'pug');

const article = require('./routes/article');
const source = require('./routes/source');

app.use('/article', article);
app.use('/source', source);

app.get('/', (req, res, next) => {
  res.render('index');
});

app.listen(3030, () => {
  console.log('Server up on port 3030...');
});

// scheduler.scheduleJob('0 0 * * *', () => { seeder.seedNews() })
