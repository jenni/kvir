const fs = require('fs');

const newsapi = require('../secrets');

class Sources {
  constructor(id, name, description, url, category, language, country) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
    this.category = category;
    this.language = language;
    this.country = country;
  }

  static create(obj) {
    return new Source(
      obj.id,
      obj.name,
      obj.description,
      obj.url,
      obj.category,
      obj.language,
      obj.country
    );
  }

  async saveSources() {
    const res = await newsapi.v2.sources();
    const sources = res.sources;

    await fs.writeFile(
      './data/sources.json',
      JSON.stringify(sources, null, 1),
      (err) => {
        if (err) throw err;

        console.log('sources saved!');
      }
    )
  }

  async saveSourceNames() {
    const names = await this.getSourceNames();

    await fs.writeFile(
      './data/sourceNames.json',
      JSON.stringify(names, null, 1),
      (err) => {
        if (err) throw err;

        console.log('Source names saved!');
      }
    )
  }

  async getSourceNames() {
    const res = await newsapi.v2.sources();
    const sources = res.sources;
    const names = sources.map(source => source.name);

    return names;
  }

  async createSourcePacks() {
    const sources = await this.getSourceNames();

    const one = sources.splice(0, 20);
    const two = sources.splice(0, 20);
    const three = sources.splice(0, 20);
    const four = sources.splice(0, 20);
    const five = sources.splice(0, 20);
    const six = sources.splice(0, 20);
    const seven = sources.splice(0, sources.length);

    const all = [one, two, three, four, five, six, seven];

    return all;
  }

  async getSourcePack(i) {
    const sources = await this.createSourcePacks();

    return sources[i].toString();
  }
}

module.exports = Sources;
