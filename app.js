const Koa = require('koa')
const http = require('http')
// const views = require('koa-views') // 页面渲染
const json = require('koa-json')
const onerror = require('koa-onerror')
const koaBody = require('koa-body')
// const bodyparser = require('koa-bodyparser') // 请求体解析
const logger = require('koa-logger')
const parameter = require('koa-parameter') 
const path = require('path')
const cors = require('koa2-cors')

const routes = require('./routes')

const config = require('./configs')
const connectDb = require('./dbs/init')

connectDb(config.dbUrl)

const app = new Koa()
// error handler
onerror(app)  

// middlewares
// 跨域
app.use(cors({
  origin: () => {
    if (process.env.npm_lifecycle_event === 'dev') {
      console.log('process.env.npm_lifecycle_event', process.env.npm_lifecycle_event);
      return '*'
    }
    return '*'
  }
}))
app.use(koaBody({
  multipart: true, // 文件上传
  strict: false,
  formidable: {
    uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
  }
}))

app.use(parameter(app))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
routes(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

const server = http.createServer(app.callback())
server.listen(config.serverPort)
module.exports = app
