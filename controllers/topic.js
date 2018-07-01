const topicModel = require('../models/topic');
const categoryModel = require('../models/category');


//查询所有话题 ，渲染页面
exports.showTopic =(req,res)=>{
    topicModel.getAll((err,topics)=>{
        res.render('./index.html',{
            topics,
            user:req.session.user
        })
    })
}
//添加话题
exports.showCreate = (req, res) => {
    categoryModel.getAll((err, categories) => {
      res.render('topic/create.html', {
        categories,
        user: req.session.user
      });
    });
  };
exports.handleTopic =(req,res)=>{
    res.send("handleTopic");

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
