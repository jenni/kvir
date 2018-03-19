require('./database-connection')

const mongoose = require('mongoose')

const Sources = require('./helpers/sources')
const Seeder = require('./helpers/seeder')

const sources = new Sources()
const seeder = new Seeder(sources)

const starterSeed = async () => {
  await seeder.seedSources()
  await seeder.seedArticles()
  await seeder.createDatabaseRelations()
}

mongoose.connection.on('open', async () => {
  console.log('Dropping database...')
  await mongoose.connection.db.dropDatabase()
  console.log(`Seeding sources and last 3 months' articles...`)
  await starterSeed()
  console.log('Finished!')
  process.exit()
})
