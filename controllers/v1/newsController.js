const app = require('express').Router()
const News = require('../../db/models/news')

app.post('/', async (req,res) => {
    try {
        const newNews = new News(req.body)
        const news = await News.createNews(newNews)

        res.json({ status: "OK", result: news })
    } catch (err) {
        res.status(500).json({ status: "error", message: err.toString() || "Something technically wrong" })
    }
});

module.exports = app
