const mongoose = require('mongoose')

const { Schema, model } = mongoose

const UserSchema = new Schema({
  email: { type: String, required: true },
  pwd: { type: String, required: true, select: false },
  name: { type: String, required: false },
  avatar: { type: String, required: false }
}, {
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      return {
        ...ret,
        id: ret._id
      }
    }
  },
})

const UserModel = model('User', UserSchema)
module.exports = UserModel
