const app = require('express').Router()
const News = require('../../db/models/news')
const errorHandler = require('../../services/error')
const newsTransform = require('../../transformers/news-transform')
const formater = require('../../utils/formater')
const constant = require('../../utils/constant')
const validator = require('../../validators/news')

app.post('/', async (req,res) => {
    try {
        const validate = validator.createUpdateNews.validate(req.body)
        if (validate.error) throw validate.error

        const newsExists = await News.findOneByTitle(req.body.title)
        if (newsExists) return errorHandler.BadRequest(res, "News is already exists.")

        if (!req.body.status) delete req.body.status
        req.body.seo_url = formater.generateSeoUrl(req.body.title)
        const newNews = new News(req.body)
        const news = await News.createNews(newNews)
        result = newsTransform.showNews(news)

        res.json({ status: "OK", result })
    } catch (err) {
        errorHandler.UnHandler(res, err)
    }
})

app.get('/', async (req,res) => {
    try {
        const meta = {
            ...constant.dataMeta(req),
            title: req.query.title == undefined ? "" : req.query.title
        }
        
        let sort = {created_at: -1}
        let query = {deleted_at: null, title: new RegExp(meta.title, "i")}

        const options = {
            lean: false,
            sort: sort,
            page: meta.page,
            limit: meta.limit
        }
        
        const result = await News.paginateNews(query, options)
        result.docs = newsTransform.listNews(result.docs)
        result.meta = meta

        res.json({ status: "OK", result })
    } catch (err) {
        errorHandler.UnHandler(res, err)
    }
})

app.get('/:news_id', async (req,res) => {
    try {
        const newsDetail = await News.findOneByID(req.params.news_id)
        const result = newsTransform.showNews(newsDetail)

        res.json({ status: "OK", result })
    } catch (err) {
        errorHandler.UnHandler(res, err)
    }
})

app.put('/:news_id', async (req,res) => {
    try {
        const validate = validator.createUpdateNews.validate(req.body)
        if (validate.error) throw validate.error

        const [newsOld, newsNew] = await Promise.all([
            News.findOneByID(req.params.news_id), 
            News.findOneByTitle(req.body.title)
        ])
        if (!newsOld) return errorHandler.BadRequest(res, "News is not found.")
        if (newsNew && newsNew.title != newsOld.title) return errorHandler.BadRequest(res, "News title is already exists.")

        if (!req.body.status) delete req.body.status
        req.body.seo_url = formater.generateSeoUrl(req.body.title)
        const newsUpdated = await News.findOneByIDAndUpdate(req.params.news_id, req.body)
        
        const result = newsTransform.showNews(newsUpdated)
        res.json({ status: "OK", result })
    } catch (err) {
        errorHandler.UnHandler(res, err)
    }
})


module.exports = app
