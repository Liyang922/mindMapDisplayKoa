const DocModel = require('../dbs/schema/doc')
const DocContentModel = require('../dbs/schema/doc_content')
const FolderModel = require('../dbs/schema/folder')
const { successResponse, getDefaultDefinition, errorResponse } = require('./utils')

async function getNewAll(ctx) {
  const documents = await DocModel.find({ userId: ctx.state.user.id })
  const folders = await FolderModel.find({ userId: ctx.state.user.id })
  console.log('documents', documents);
  console.log('folders', folders);
  return {
    documents: documents || [],
    folders: folders || []
  }
}

class Docs {
  async getAllDocs(ctx) {
    const { latest } = ctx.request.query
    if (latest) {
      // 如果带latest参数 返回最近编辑的文档
      const documents = await DocModel.find({ userId: ctx.state.user.id })
        .limit(Number(latest)).sort({ updateTime: -1 })
      // console.log('documents', documents);
      ctx.body = successResponse(documents)
    } else {
      const all = await getNewAll(ctx)
      ctx.body = successResponse(all)
    }
  }

  async getDocContent(ctx) {
    const content = await DocContentModel.findOne({ docId: ctx.params.docId })
    ctx.body = successResponse(content)
  }

}
module.exports = new Docs()
