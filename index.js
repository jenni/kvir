const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const scheduler = require('node-schedule');
require('./db/database-connection');

const Seeder = require('./db/seeder');
const seeder = new Seeder();

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

scheduler.scheduleJob('0 0 * * *', () => { seeder.seedNews() })
