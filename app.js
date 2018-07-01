//程序入口 负责：1配置 2 监听端口
//引入数据
var express = require('express');
var art = require('express-art-template')
var bodyParser = require('body-parser');
var router= require('./router');
const session = require('express-session')

var MySQLStore = require('express-mysql-session')(session);
const config = require('./config');

var app = express();
// TODO
//统一静态资源管理
app.use('/public', express.static('./public/'))
app.use('/node_modules', express.static('./node_modules/'))

//配置
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
app.engine('html', require('express-art-template'));


//将session存入mysql
const db =config.database;
var options ={
  port            : db.port,
  host            : db.host,
  user            : db.user,
  password        : db.password,
  database        : db.database
};

var sessionStore = new MySQLStore(options);
// 配置session
app.use(session({
    key: 'sessionID',// 修改sessionid的名称
    secret: 'keyboard cat',//加密
    store: sessionStore,//session存入mysql 
    resave: false,// 强制重新存储服务器上的session数据  
    saveUninitialized: true
}));


//挂载路由
app.use(router)

app.listen(config.PORT, () => {
    console.log('监听 4000');
})

