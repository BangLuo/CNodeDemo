//连接数据库
const db = require('./db_helper');
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
    //添加数据之前，要做数据验证
    //TODO 验证数据是否重复

    //验证邮箱是否重复
    db.query(
        'select * from `users`  where `email` =?',
        req.body.email,
        (err,results)=>{
            if(err){
                console.log(err);
                return res.send('服务器内部错误');
            }
            if(results.length > 0){
                //数据表已存在该数据
                res.render('signup.html', {
                    msg:'邮箱已存在'
                })
                return
            }
              //验证昵称是否存在
            db.query(
                'select * from `users`  where `nickname` =?',
                req.body.nickname,
                    (err,results)=>{
                        if(err){
                            console.log(err);
                            return res.send('服务器内部错误');
                        }
                        if(results.length > 0){
                            //数据表已存在该数据
                            res.render('signup.html', {
                                msg:'昵称已存在'
                            })
                            return
                        }
                        //验证完邮箱和密码都没有重复 执行
                        req.body.createdAt = new Date();
                        req.body.password = md5(req.body.password + 'abcdef');
                        var sqlstr = 'insert into `users` set ?'
                        db.query(sqlstr, req.body, (err,results)=>{
                            if(err){
                                console.log(err);
                                return res.send('服务器内部错误');
                            }
                            if(results.affectedRows === 1) {
                                res.redirect('/signin')  
                            }else{
                                res.render("signup.html", {
                                    msg: "注册失败"
                                })
                            }
                        });


                    }
                )


       
        }

    )
      

 
      
}
exports.handleSigOut =(req,res)=>{
    res.send("handleSigOut");

}

