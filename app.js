/**
 * get用于获取数据，post用于提交数据
 */
const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()
const port = 8080

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// 解决跨域
app.use(function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method == "OPTIONS") res.sendStatus(200); //让options尝试请求快速结束
  else next();
});

const upload = multer({
  // 上传临时存放在此目录
  dest: "./public/upload/temp",
});
//所有接口都允许有上传功能
app.use(upload.any())

app.use('/test', require("./routers/testRouter"))
app.use('/db', require("./routers/dbRouter"))

//全局中间件
app.use(function (req, res, next) {
  console.log('LOGGED')
    //给req添加一个属性
  req.requestTime = Date.now()
  next()
})

app.get('/', (req, res) => {
  res.send('我是一个get请求!')
})

app.post('/', (req, res) => {
  res.send('我是一个post请求!')
  console.log(req.query)
  console.log(req.body)
  res.send('ok')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})