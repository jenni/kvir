const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const scheduler = require('node-schedule');

require('./db/database-connection');

const app = express();
const port = process.env.PORT || 3000;

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
  console.log(`Server up on port ${port}...`);
});

// scheduler.scheduleJob('0 0 * * *', () => { seeder.seedNews() })
