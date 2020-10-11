const constant = {};
constant.dataMeta = (req) => {
    return {
        limit: (!req.query.limit || req.query.limit == undefined) ? 10 : parseInt(req.query.limit),
        page: (!req.query.page || req.query.page == undefined) ? 1 : parseInt(req.query.page)
    }
}

module.exports = constant;
