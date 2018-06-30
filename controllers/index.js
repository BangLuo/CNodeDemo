exports.showIndex =(req,res)=>{
    
    res.render('index.html',{
        sessionUser:req.session.user
    })

}