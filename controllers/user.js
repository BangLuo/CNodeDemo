//引入数据模型
const userModel = require('../models/user');

//引包
const md5 = require('md5');

exports.showsSignIn =(req,res)=>{
    //res.send("showsSignIn");
    res.render("signin.html");

}
//处理登录逻辑
exports.handleSignIn =(req,res)=>{
    // req.setHeader('Referrer Policy','unsafe-url')
    userModel.getByEmail( req.body.email, (err,user)=>{
        if(err){
            next(err);
        }
        if(!user){
           return res.json({
               code:401,
               msg: '邮箱不存在'
           })    
        }
        req.body.password = md5(req.body.password);
        if(req.body.password === user.password){
            //在登录成功时 记录session
            delete req.body.password;
            req.session.user = user;
            return res.json({
                code: 200,
                msg:'登陆成功'
            })
        }else{
            return res.json({
                code:402,
                msg:'密码错误,请重新输入'
            })
        }


    });


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
                next(err);
            }
            if(user){
               return res.render('signup.html',{
                   msg:'邮箱已存在'
                });           
            }
            //验证昵称是否重复
            userModel.getByNickname(req.body.nickname,(err,user)=>{
                if(err){
                    next(err);
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
//处理登出逻辑
exports.handleSigOut =(req,res)=>{
   req.session.destroy();
   res.redirect('/');
};

