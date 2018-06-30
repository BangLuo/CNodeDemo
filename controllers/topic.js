const topicModel = require('../models/topic');

//查询所有话题 ，渲染页面
exports.showTopic =(req,res)=>{
    topicModel.getAll((err,categories)=>{
        res.render('./index.html',{
            categories
        })
    })
}
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
