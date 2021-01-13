const mongoose = require('mongoose')
const settings = require('../config/settings')
let connectionString = ''

process.env.NODE_ENV === 'test'
    ? (connectionString = settings.MONGODB.TESTDB)
    : (connectionString = settings.MONGODB.MONGOURL)
console.log('connectionstring', connectionString)

mongoose.connect(connectionString, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((res) => { console.log(`connected successfully`, connectionString) })
    .catch((error => { console.log(`error connecting`, error); process.exit(1); }))

module.exports = mongoose