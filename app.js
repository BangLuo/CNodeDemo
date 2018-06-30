// //程序入口 负责：1配置 2 监听端口
// //引入数据
// var express = require('express');
// var art = require('express-art-template')
// var bodyParser = require('body-parser');
// var router= require('./router');
// const session = require('express-session')

// var MySQLStore = require('express-mysql-session')(session);
// const config = require('./config');

// var app = express();
// // TODO
// //统一静态资源管理
// app.use('/public', express.static('./public/'))
// app.use('/node_modules', express.static('./node_modules/'))

// //配置
// app.use(bodyParser.urlencoded({ extended: false }))
// //app.use(bodyParser.json())
// app.engine('html', require('express-art-template'));

// //配置session
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     //cookie: { secure: true }
//   }))
// //将session存入mysql
// const db =config.database;
// var options ={
//   port            : db.port,
//   host            : db.host,
//   user            : db.user,
//   password        : db.password,
//   database        : db.database
// };

// var sessionStore = new MySQLStore(options);
// // 配置session
// app.use(session({
//     key: 'sessionID',// 修改sessionid的名称
//     secret: 'keyboard cat',//加密
//     store: sessionStore,//session存入mysql 
//     resave: false,// 强制重新存储服务器上的session数据  
//     saveUninitialized: true
// }));


// //挂载路由
// app.use(router)

// app.listen(config.PORT, () => {
//     console.log('监听 4000');
// })


const express = require('express');
// 导入处理模板的模块
const expressArtTemplate = require('express-art-template');
// 导入路由模块
const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const config = require('./config');
const app = express();

// 监听端口  
app.listen(config.PORT, () => {
  console.log('监听 ' + config.PORT);
});

// 处理静态资源  -- 下载bootstrap@3.3.7  jquery
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));
// 配置模板引擎
app.engine('html', expressArtTemplate);
// 配置bodyParser
// parse application/x-www-form-urlencoded
// name=zs&pwd=123
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
// { "name": "zs", "age": 18 }
// app.use(bodyParser.json());


var db = config.database;
// 把session保存到mysql中
var options = {
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.database
};

var sessionStore = new MySQLStore(options);
// 配置session
app.use(session({
  key: 'sessionid',  // 修改sessionid的名称
  secret: 'keyboard cat',  // 对sessionid 进行加密 
  resave: false,   // 强制重新存储服务器上的session数据  
  store: sessionStore,   // 配置把session数据存储到mysql
  saveUninitialized: true  // 即使不写session 也会生成sessionid
}));


// 注册路由
app.use(router);