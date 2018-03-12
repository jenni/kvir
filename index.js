const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const scheduler = require('node-schedule');
require('./db/database-connection');

const Seeder = require('./db/seeder');
const SourcesSeeder = require('./db/seeder-sources');

const seeder = new Seeder();
const sources = new SourcesSeeder();

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
  console.log('Server listening...');
});

// sources.seedSources();
// seeder.starterSeed();
// seeder.createRelations();

// seeder.createRelationSourceToArticle();

// seeder.displaySourceContent();


// scheduler.scheduleJob('0 0 * * *', () => { seeder.seedNews() })
