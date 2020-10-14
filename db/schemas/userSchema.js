const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
  name: { type: String },
  email: { type: String },
  address: { type: String },
  gender: { type: String, enum: ['male', 'femmale'] },

  deleted_at:     { type: Date }
}, {
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = NewsSchema
