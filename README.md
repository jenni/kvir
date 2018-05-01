## Queer Fish

Get the fresher Queer Fish from 134 sources online.
Comes with as many languages as existing genders.

_******UNDER CONSTRUCTION******_

...meanwhile, get a taste from your console:

`$ node index.js`

### Seeding

`dotenv` library is used to manage environment variables.

The entry file (`index.js`) will recognise the environment the app is being executed in:

```
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
```

After creating a Heroku app, an mLab (mongodb) database needs to be associated:

`$ heroku addons:create mongolab:sandbox`

**Development:**

* Save your `newsAPI` key in an `.env` file in the root of the project.

`NEWS_API_KEY='your_key_here'`

Seed the local database:

`$ npm run-script seed`

**Production:**

* Set the Heroku environment key for the `newsAPI`:

`$ heroku config:set NEWS_API_KEY='you_key_here'`

Seed the Heroku database:

`$ heroku run node db/seed.js`



### Featured:

```
 "ABC News",
 "ABC News (AU)",
 "Aftenposten",
 "Al Jazeera English",
 "ANSA.it",
 "Argaam",
 "Ars Technica",
 "Ary News",
 "Associated Press",
 "Australian Financial Review",
 "Axios",
 "BBC News",
 "BBC Sport",
 "Bild",
 "Blasting News (BR)",
 "Bleacher Report",
 "Bloomberg",
 "Breitbart News",
 "Business Insider",
 "Business Insider (UK)",
 "Buzzfeed",
 "CBC News",
 "CBS News",
 "CNBC",
 "CNN",
 "CNN Spanish",
 "Crypto Coins News",
 "Daily Mail",
 "Der Tagesspiegel",
 "Die Zeit",
 "El Mundo",
 "Engadget",
 "Entertainment Weekly",
 "ESPN",
 "ESPN Cric Info",
 "Financial Post",
 "Financial Times",
 "Focus",
 "Football Italia",
 "Fortune",
 "FourFourTwo",
 "Fox News",
 "Fox Sports",
 "Globo",
 "Google News",
 "Google News (Argentina)",
 "Google News (Australia)",
 "Google News (Brasil)",
 "Google News (Canada)",
 "Google News (France)",
 "Google News (India)",
 "Google News (Israel)",
 "Google News (Italy)",
 "Google News (Russia)",
 "Google News (Saudi Arabia)",
 "Google News (UK)",
 "Göteborgs-Posten",
 "Gruenderszene",
 "Hacker News",
 "Handelsblatt",
 "IGN",
 "Il Sole 24 Ore",
 "Independent",
 "Infobae",
 "InfoMoney",
 "La Gaceta",
 "La Nacion",
 "La Repubblica",
 "Le Monde",
 "Lenta",
 "L'equipe",
 "Les Echos",
 "Libération",
 "Marca",
 "Mashable",
 "Medical News Today",
 "Metro",
 "Mirror",
 "MSNBC",
 "MTV News",
 "MTV News (UK)",
 "National Geographic",
 "NBC News",
 "News24",
 "New Scientist",
 "News.com.au",
 "Newsweek",
 "New York Magazine",
 "Next Big Future",
 "NFL News",
 "NHL News",
 "NRK",
 "Politico",
 "Polygon",
 "RBC",
 "Recode",
 "Reddit /r/all",
 "Reuters",
 "RT",
 "RTE",
 "RTL Nieuws",
 "SABQ",
 "Spiegel Online",
 "Svenska Dagbladet",
 "T3n",
 "TalkSport",
 "TechCrunch",
 "TechCrunch (CN)",
 "TechRadar",
 "The Economist",
 "The Globe And Mail",
 "The Guardian (AU)",
 "The Guardian (UK)",
 "The Hill",
 "The Hindu",
 "The Huffington Post",
 "The Irish Times",
 "The Lad Bible",
 "The New York Times",
 "The Next Web",
 "The Sport Bible",
 "The Telegraph",
 "The Times of India",
 "The Verge",
 "The Wall Street Journal",
 "The Washington Post",
 "Time",
 "USA Today",
 "Vice News",
 "Wired",
 "Wired.de",
 "Wirtschafts Woche",
 "Xinhua Net",
 "Ynet"
 ```
