const mongoose = require('mongoose')
const settings = require('../config/settings')
let connectionString = ''

process.env.NODE_ENV === 'test'
    ? (connectionString = settings.MONGODB.TESTDB)
    : (connectionString = settings.MONGODB.MONGOURL)

mongoose.connect(connectionString, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((res) => {
        console.log(`connected successfully with
            connectionString: ${res.connections[0]._connectionString}, 
            Name: ${res.connections[0].name},
            Host: ${res.connections[0].host},
            Port: ${res.connections[0].port},
        `)
    })
    .catch((error => { console.log(`error connecting`, error); process.exit(1); }));

module.exports = mongoose;