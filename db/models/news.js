const newsSchema = require('../schemas/newsSchema')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
newsSchema.plugin(mongoosePaginate);

const News = mongoose.model('news', newsSchema)
News.createNews = (newNews) => {
    return newNews.save()
}

News.paginateNews = (query, options) => {
    return News.paginate(query, options)
}

News.findOneByID = (newsID) => {
    return News.findById(newsID)
}

News.findOneByTitle = (newsTitle) => {
    return News.findOne({title: newsTitle})
}

module.exports = News
