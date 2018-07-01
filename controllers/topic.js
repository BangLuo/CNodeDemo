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

exports.showTopicID =(req,res)=>{
    res.send("showTopicID");
}
exports.showEdit =(req,res)=>{
    res.send("showEdit");

}
exports.handleEdit =(req,res)=>{
    res.send("handleEdit");

}
exports.handleDel =(req,res)=>{
    res.send("handleDel");

}
