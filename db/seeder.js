require('./database-connection');
const mongoose = require('mongoose');

const Sources = require('../models/sources');
const sources = new Sources();

const articleModel = require('../services/news-service');

const moment = require('moment');
const newsapi = require('../secrets');

class Seeder {
  async starterSeed() {
    const sourcePacks = await sources.createSourcePacks();

    for (let pack of sourcePacks) {
      const res = await newsapi.v2.everything(
        {
          sources: pack.toString(),
          q: 'queer'
        }
      )

      const articles = res.articles;

      for (let article of articles) {
        await articleModel.add(article);
      }
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
}

module.exports = Seeder;
