const topicModel = require('../models/topic');
const categoryModel = require('../models/category');


//查询所有分类 渲染添加话题
exports.showTopic =(req,res)=>{
    categoryModel.getAll((err, categories) => {
        res.render('topic/create.html', {
          categories,
          user: req.session.user
        });
      });
    };

// 处理 ---添加话题 
exports.handleCreate =(req,res)=>{
    //处理添加话题时需要判断是否登录-- 从session中进行判断
    if (!req.session.user) {
        res.json({
          code: 403,
          msg: '登录过期，请先登录'
        });
    }
    req.body.userId = req.session.user.id;
    req.body.createdAt = new Date();
    topicModel.createTopic(req.body,(err, isOK)=>{
        if(err){
            return res.send('系统内部错误--添加');
        }
        if(isOK){
            res.send({
                code:200,
                msg:'添加成功'
            })
        }else{
            res.send({
                code:501,
                msg:'添加失败'
            })
        }
    })
}
//显示话题详情页--url地址栏传参
exports.showTopicID =(req,res)=>{
    const id = req.params.topicID;
    if(isNaN(id)){
       return res.send('参数错误');
    }
    topicModel.getById(id, (err, topic) => {
        if (err) {
          return res.send('服务器内部错误');
        }
        if (topic) {
          res.render('topic/show.html', {
            topic,
            user:req.session.user
          })
        } else {
          res.send('您查询的话题不存在');
        }
      });
    
}
//显示话题编辑页 ---即话题create页面 但需要将原数据进行渲染
exports.showEdit =(req,res)=>{
   categoryModel.getAll((err, categories)=>{
       if(err){
        return res.send('系统内部错误');
       }
       const id = req.params.topicID;

       if(isNaN(id)){
          return res.send('参数错误');
       }
       topicModel.getById(id, (err, topic) => {
           if (err) {
             return res.send('服务器内部错误');
           }
           if (topic) {
             res.render('topic/create.html', {
               topic,
               user:req.session.user,
               categories
             })
           } else {
             res.send('您查询的话题不存在');
           }
         });
   })

}
//提交新编辑页面
exports.handleEdit =(req,res)=>{
    res.send("handleEdit");

}
exports.handleDel =(req,res)=>{
    const id = req.params.topicID;
    // 2 删除数据
    topicModel.delete(id, (err, isOK) => {
      if (err) {
        return res.send('服务器内部错误');
      }
      if (isOK) {
        res.redirect('/');
      } else {
        // 传统的请求响应方式，不好
        // 错误的时候，也要重新渲染整个页面
        res.send('删除失败');
      }
    });

}
