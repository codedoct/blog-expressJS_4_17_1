const newsSchema = require('../schemas/newsSchema')
const mongoose = require('mongoose')

const News = mongoose.model('news', newsSchema)

News.createNews = (newNews) => {
    return newNews.save()
}

module.exports = News
