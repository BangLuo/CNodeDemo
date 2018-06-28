//连接数据库
const db = require('./db_helper');

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
exports.handleSignUp =(req,res)=>{
    var sqlstr = 'insert into `uesers` set ?'
   db.query(sqlstr, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
      });
      

}
exports.handleSigOut =(req,res)=>{
    res.send("handleSigOut");

}

