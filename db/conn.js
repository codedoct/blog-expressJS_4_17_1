const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const MONGO_HOST = process.env.MONGO_HOST || 'localhost'
const MONGO_DB = process.env.MONGO_DB || 'codedoct-expressjs4171'
const MONGO_PORT = process.env.MONGO_PORT || '27017'
const MONGO_AUTH = process.env.MONGO_USER && process.env.MONGO_PASS ? `${process.env.MONGO_USER}:${process.env.MONGO_PASS}@` : ''

mongoose.set('useFindAndModify', false)

const connection = `mongodb://${MONGO_AUTH}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`
mongoose.connect(connection, {
    useNewUrlParser: true,
    useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function callback () {
    console.log("DB is ready.")
})

module.exports = db

mongoosePaginate.paginate.options = {
    lean: true,
    limit: 20
}
