//route 路由规则  router路由对象
//router 负责设计路由规则


//安装 express
//express.Router
//ruter.get()
//导出router
//app。js中导入 并挂载

var express = require('express');
var index = require('./controllers/index');
var user = require('./controllers/user');
var topic = require('./controllers/topic');



var router = express.Router();

//首页路由
router.get('/', index.showIndex);

//用户路由
router.get('/signin', user.showsSignIn)

      .post('/signin', user.handleSignIn)

      .get('/signup', user.showsSignUp)

      .post('/signup', user.handleSignUp)

      .get('/signout', user.handleSigOut)

//话题路由
            //显示   添加话题
router.get('/topic/create',topic.showTopic)
            //处理--添加话题
        .post('/topic/create',topic.handleCreate)
            //展示话题详情页
        .get('/topic/:topicID',topic.showTopicID)
            //编辑---展示话题详情页
        .get('/topic/:topicID/edit',topic.showEdit)
            //编辑---处理话题详情页
        .post('/topic/:topicID/edit',topic.handleEdit)
            //删除---处理话题详情页
        .get('/topic/:topicID/delete',topic.handleDel)



module.exports = router;