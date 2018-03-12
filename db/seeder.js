require('./database-connection');
const mongoose = require('mongoose');

const Sources = require('./seeder-sources');
const sources = new Sources();

const articleService = require('../services/news-service');
const sourceService = require('../services/source-service');

const articleModel = require('../models/article-model');
const sourceModel = require('../models/source-model');


const moment = require('moment');
const newsapi = require('../secrets');

class Seeder {
  async starterSeed() {
    const sourcePacks = await sources.createSourcePacks();

    for (let pack of sourcePacks) {
      if (pack.length > 0 && pack.length <= 20) {
        const res = await newsapi.v2.everything(
          {
            sources: pack.toString(),
            q: 'queer'
          }
        )

        const articles = res.articles;

        for (let article of articles) {
          await articleModel.add(article);
          console.log(article)
        }
      }
    }
  }

  async createRelationArticlesToSource() {
    const articles = await articleService.findAll();
    const sources = await sourceService.findAll();

    for (let article of articles) {
      const sourceDb = await sourceModel.findOne({ 'name': article.source.name });

      sourceDb.articles.push(article);
      await sourceDb.save();
    }
  }

  async createRelationSourceToArticle() {
    const articles = await articleService.findAll();
    const sources = await sourceService.findAll();

    for (let article of articles) {
      let sourceDb = await sourceModel.findOne({ 'name': article.source.name });

      article.sources = sourceDb;
      await article.save();
    }
  }

  async seedNews() {
    const sourcePacks = await sources.createSourcePacks();
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
      )
      const articles = res.articles;

      for (let article of articles) {
        await articleModel.add(article);
      }
    }
  }

  async displaySourceContent() {
    const sources = await sourceService.findAll();

    for (let source of sources) {
      console.log(source);
    }
  }
}

module.exports = Seeder;
