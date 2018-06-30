//程序入口 负责：1配置 2 监听端口
//引入数据
var express = require('express');
var art = require('express-art-template')
var bodyParser = require('body-parser');
var router= require('./router');
const session = require('express-session')
const PORT = 4000;

var app = express();
// TODO
//统一静态资源管理
app.use('/public', express.static('./public/'))
app.use('/node_modules', express.static('./node_modules/'))

//配置
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
app.engine('html', require('express-art-template'));

//配置session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true }
  }))
//挂载路由
app.use(router)

app.listen(PORT, () => {
    console.log('监听 4000');
})