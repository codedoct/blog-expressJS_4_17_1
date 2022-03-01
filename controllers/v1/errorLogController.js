const app = require('express').Router();
const errorHandler = require('~/services/error');
const ErrorLog = require('~/db/models/error_log');
const constant = require('~/utils/constant');

app.get('/', async (req,res) => {
    try {
        const meta = {...constant.dataMeta(req)};
        const options = {
            lean: false, // Should return plain javascript objects instead of Mongoose
            sort: { created_at: -1 },
            page: meta.page,
            limit: meta.limit
        };
        
        const result = await ErrorLog.paginateErrorLog({}, options);
        result.meta = meta;

        res.json({ status: "OK", result });
    } catch (err) {
        errorHandler.UnHandler(res, err);
    }
});

module.exports = app;
