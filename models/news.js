const fs = require('fs');
const moment = require('moment');
const newsapi = require('../secrets');

const loadArticles = (file) => {
  try {
    const contents = fs.readFileSync(
      file,
      'utf8',
      (err) => {
        if (err) throw err;
      }
    );
    return JSON.parse(contents);
  } catch(e) {
    return [];
  }
}

const saveArticles = async (file, articles) => {
  await fs.writeFile(
    file,
    JSON.stringify(articles, null, 1),
    (err) => {
      if (err) throw err;

      console.log('news saved!');
    }
  )
}

class News {
  constructor(sources, source, author, title, description, url, urlToImage, publishedAt) {
    this.sources = sources;
    this.source = source;
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.urlToImage = urlToImage;
    this.publishedAt = publishedAt;
  }

  static create(obj) {
    return new News(
      obj.sources,
      obj.source,
      obj.author,
      obj.title,
      obj.description,
      obj.url,
      obj.urlToImage,
      obj.publishedAt
    );
  }

  async getAll() {
    const sourcePacks = await this.sources.createSourcePacks();

    for (let pack of sourcePacks) {
      const res = await newsapi.v2.everything(
        {
          sources: pack.toString(),
          q: 'queer'
        }
      )

      const storage = loadArticles('./data/news.json');
      const articles = res.articles;

      for (let article of articles) {
        storage.push(article);
      }

      await saveArticles('./data/news.json', storage);
    }
  }

  async fetchTodayArticles() {
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
      )

      const storage = loadArticles('./data/today-news.json');
      const articles = res.articles;

      for (let article of articles) {
        storage.push(article);
      }

      await saveArticles('./data/today-news.json', storage);
    }
  }
}

module.exports = News;
