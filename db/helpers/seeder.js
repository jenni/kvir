const Sources = require('./sources');
const sources = new Sources();

const articleModel = require('../../models/article-model');
const sourceModel = require('../../models/source-model');

const moment = require('moment');
const newsapi = require('../../secrets');

class Seeder {
  constructor(sources) {
    this.sources = sources;
  }

  async createDatabaseRelations() {
    const articles = await articleModel.find();
    const sources = await sourceModel.find();

    for (const article of articles) {
      const sourceDb = await sourceModel.findOne({ 'name': article.source.name });

      article.sources = sourceDb;
      sourceDb.articles.push(article);
      await sourceDb.save();
      await article.save();
    }
  }

  async seedSources() {
    const res = await newsapi.v2.sources();
    const sources = res.sources;

    for (let source of sources) {
      await sourceModel.create(source);
    }
  }

  async seedArticles() {
    const sourcePacks = await this.sources.createSourcePacks();

    for (let pack of sourcePacks) {
      if (pack.length > 0 && pack.length <= 20) {
        const res = await newsapi.v2.everything(
          {
            sources: pack.toString(),
            q: 'queer'
          }
        );

        const articles = res.articles;

        for (let article of articles) {
          await articleModel.create(article);
        }
      }
    }
  }

  async seedNews() {
    const sourcePacks = await this.sources.createSourcePacks();
    const date = {
      yesterday: moment().subtract(1, 'day').format('YYYY-MM-DD'),
      today: moment().format('YYYY-MM-DD')
    };

    for (let pack of sourcePacks) {
      const res = await newsapi.v2.everything(
        {
          sources: pack.toString(),
          q: 'queer',
          from: date.today,
          to: date.today
        }
      );
      const articles = res.articles;

      for (let article of articles) {
        await articleModel.create(article);
      }
    }
  }
}

module.exports = Seeder;
