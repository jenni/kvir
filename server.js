const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const scheduler = require('node-schedule');

const port = process.env.PORT || 3030;
const app = express();

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

app.listen(port, () => {
  console.log('Server up on port 3030...');
});

// scheduler.scheduleJob('0 0 * * *', () => { seeder.seedNews() })
