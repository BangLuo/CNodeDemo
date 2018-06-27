//安装 express
//express.Router
//ruter.get()
//导出router
//app。js中导入 并挂载

var express = require('express');
var index = require('./controller/index');
var user = require('./controller/user');
var topic = require('./controller/topic');



var router = express.Router();

//首页路由
router.get('/', index.showIndex);

//用户路由
router.get('/signin', user.showsSignIn)

      .post('/signin', user.handleSignIn)

      .get('/signup', user.showsSignUp)

      .post('/signup', user.handleSignUp)

      .post('/signout', user.handleSigOut)

//话题路由

router.get('/topic/create',topic.showTopic)

        .post('/topic/create',topic.handleTopic)

        .get('/topic/:topicID',topic.showTopicID)

        .get('/topic/:topicID/edit',topic.showEdit)

        .post('/topic/:topicID/edit',topic.handleEdit)

        .post('/topic/:topicID/delete',topic.handleDel)







module.exports = router;