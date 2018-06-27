//程序入口
var express = require('express');
var router= require('./router');


var app = express();
app.use('/public', express.static('./public/'))
app.use('/node_modules', express.static('./node_modules/'))

app.use(router);

app.listen(3000, (err, data)=>{
    console.log('suc')
})