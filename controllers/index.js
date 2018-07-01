const topicModel = require('../models/topic');
exports.showIndex =(req,res)=>{
    
    topicModel.getAll((err,topics)=>{
        res.render('./index.html',{
            topics,
            user:req.session.user,
            
        })
    })

}