const router = require('koa-router')()
const jwt = require('koa-jwt')
const docs = require('../controller/docs')
const user = require('../controller/user')
const { tokenSecret } = require('../configs')

const auth = jwt({ secret: tokenSecret })

router.prefix('/docs')

router.get('/getAllDocs/:id', auth, user.checkOwner, docs.getAllDocs)
router.get('/getDocContent/:id/:docId', auth, user.checkOwner, docs.getDocContent)

module.exports = router
