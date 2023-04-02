const mongoose = require('mongoose')

const { Schema, model } = mongoose

const FolderSchema = new Schema({
  name: { type: String, required: true },
  folderId: { type: String, required: true },
  userId: { type: String, required: true },
  folderType: { type: Number, required: true },
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  },
  // 调用toJSON时触发
  toJSON: {
    // 规定json转换结果
    transform: (doc, ret) => {
      return {
        ...ret,
        id: ret._id,
        createTime: ret.createTime.valueOf(),
        updateTime: ret.updateTime.valueOf()
      }
    }
  },
})

module.exports = model('Folder', FolderSchema)
