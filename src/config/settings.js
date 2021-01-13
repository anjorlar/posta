require("dotenv").config()
const settings = {
    PORT: process.env.PORT,
    MONGODB: {
        MONGOURL: process.env.MONGODBURL,
        TESTDB: process.env.TESTDB
    }
}

module.exports = settings