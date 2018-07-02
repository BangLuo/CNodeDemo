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
const validate = require('./controllers/validate')



var router = express.Router();

//首页路由
router.get('/', index.showIndex);

//用户路由
router.get('/signin', user.showsSignIn)

      .post('/signin', user.handleSignIn)

      .get('/signup', user.showsSignUp)

      .post('/signup', user.handleSignUp)

      .get('/signout',validate, user.handleSigOut)

//话题路由
            //显示   添加话题
router.get('/topic/create',validate,topic.showTopic)
            //处理--添加话题,
        .post('/topic/create',validate,topic.handleCreate)
            //展示话题详情页
        .get('/topic/:topicID',validate,topic.showTopicID)
            //编辑---展示话题详情页
        .get('/topic/:topicID/edit',validate,topic.showEdit)
            //编辑---处理话题详情页
        .post('/topic/:topicID/edit',validate,topic.handleEdit)
            //删除---处理话题详情页
        .get('/topic/:topicID/delete',validate,topic.handleDel)



module.exports = router;