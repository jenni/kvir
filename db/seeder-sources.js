const fs = require('fs');

const newsapi = require('../secrets');

const sourceModel = require('../services/source-service');

class Sources {
  async getSourceNames() {
    const sources = await sourceModel.findAll();
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

  async seedSources() {
    const res = await newsapi.v2.sources();
    const sources = res.sources;

    for (let source of sources) {
      await sourceModel.add(source);
    }

  }
}

module.exports = Sources;
