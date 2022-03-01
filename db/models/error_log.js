const errorLogSchema = require('../schemas/errorLogSchema');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

errorLogSchema.plugin(mongoosePaginate);
const ErrorLog = mongoose.model('error_log', errorLogSchema);

ErrorLog.paginateErrorLog = (query, options) => {
    return ErrorLog.paginate(query, options);
};

ErrorLog.createErrorLog = (newErrorLog) => {
    return newErrorLog.save();
};

module.exports = ErrorLog;
