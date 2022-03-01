const ErrorLog = require('~/db/models/error_log');

const errorHandler = {};
errorHandler.BadRequest = (res, err) => {
    res.status(400).json({ status: "error", message: err });
};
errorHandler.Unauthorized = (res) => {
    res.status(401).json({ status: "error", message: "Unauthorized" });
};
errorHandler.NotFound = (res, err) => {
    res.status(404).json({ status: "error", message: err || "Not found" });
};
errorHandler.UnHandler = (res, err) => {
    if (err.name == "ValidationError") {
        let errorMessage;
        if (err.details) {
            errorMessage = err.details[0].message;
        } else {
            errorMessage = err.message;
        }

        res.status(400).json({ status: "error", message: errorMessage });
    } else {
        const message = err.toString() || 'Something technically wrong';
        if (err.kind == 'ObjectId') {
            res.status(400).json({ status: 'error', message });
        } else {
            sendErrorLog(res, err);
            res.status(500).json({ status: 'error', message });
        }
    }
};

// Private
const sendErrorLog = async (res, err) => {
    const stack = new Error(err).stack;
    const header = JSON.stringify(res.req.headers);
    const body = JSON.stringify(res.req.body);

    await ErrorLog.createErrorLog(new ErrorLog({
        path: res.req.originalUrl,
        method: res.req.method,
        body: body,
        header: header,
        log: stack||'Something technically wrong'
    }));
};

module.exports = errorHandler;
