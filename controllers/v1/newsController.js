const app = require('express').Router()
const News = require('../../db/models/news')
const errorHandler = require('../../services/error')
const newsTransform = require('../../transformers/news-transform')
const formater = require('../../utils/formater')
const validator = require('../../validators/news')

app.post('/', async (req,res) => {
    try {
        const validate = validator.createUpdateNews.validate(req.body)
        if (validate.error) throw validate.error

        const newsExists = await News.findOne({title: req.body.title})
        if (newsExists) return errorHandler.BadRequest(res, "News is already exists")

        if (!req.body.status) delete req.body.status
        req.body.seo_url = formater.generateSeoUrl(req.body.title)
        const newNews = new News(req.body)
        const news = await News.createNews(newNews)
        result = newsTransform.showNews(news)

        res.json({ status: "OK", result })
    } catch (err) {
        errorHandler.UnHandler(res, err)
    }
});

module.exports = app
