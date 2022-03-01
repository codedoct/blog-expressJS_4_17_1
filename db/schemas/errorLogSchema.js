const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ErrorLogSchema = new Schema({
    path:    { type: String },
    method:  { type: String },
    body:    { type: String },
    headers: { type: String },
    log:     { type: String }
}, {
    versionKey:     false,
    timestamps:     { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = ErrorLogSchema;
