//引入数据模型
const userModel = require('../models/user');

//引包
const md5 = require('md5');

exports.showsSignIn =(req,res)=>{
    //res.send("showsSignIn");
    res.render("signin.html");

}
exports.handleSignIn =(req,res)=>{
    //res.send("handleSignIn");
    res.render("signin.html");

}
exports.showsSignUp =(req,res)=>{
   // res.send("showsSignUp");
   res.render("signup.html");

}

//处理注册逻辑
exports.handleSignUp =(req,res)=>{
    //验证邮箱是否重复
    userModel.getByEmail( req.body.email, (err,user)=>{
            if(err){
                return res.send('服务器内部错误');
            }
            if(user){
               return res.render('signup.html',{
                   msg:'邮箱已存在'
                });           
            }
            //验证昵称是否重复
            userModel.getByNickname(req.body.nickname,(err,user)=>{
                if(err){
                    return res.send('服务器内部异常');
                }
                if(user){
                   return res.render('signup.html',{
                       msg: '昵称已存在'
                    });            
                }
                //添加用户
                //必填项配置
                req.body.createdAt = new Date();
                req.body.password = md5(req.body.password);

                userModel.createUser(req.body, (err,isOK)=>{
                    if(isOK){
                        res.redirect('/signin');
                    }else{
                       res.render('signup.html', {
                            msg:"注册失败"
                        });
                    }
                })
            });
        });   
};
exports.handleSigOut =(req,res)=>{
    res.send("handleSigOut");

}

