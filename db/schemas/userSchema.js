const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { getFile } = require('~/services/file');

const UserSchema = new Schema({
  name: { type: String },
  profile: { type: String },
  email: { type: String },
  password: { type: String },
  address: { type: String },
  gender: { type: String, enum: ['male', 'femmale'] },
  token: { type: String },

  deleted_at:     { type: Date }
}, {
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

UserSchema.virtual('profile_url').get(function () {
  return getFile(this.profile);
});

module.exports = UserSchema
