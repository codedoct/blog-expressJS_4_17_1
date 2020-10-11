const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
  title: { type: String },
  seo_url: { type: String },
  content: { type: String },
  status: { type: Number, default: 1 }, // 0: draft, 1: publish

  deleted_at:     { type: Date }
}, {
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = NewsSchema
