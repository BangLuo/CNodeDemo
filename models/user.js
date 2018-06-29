
const db = require('./db_helper');
//创建用户

exports.createUser =(user, callback)=>{
    db.query( 
       'insert into `users` set ?',
       user,
       (err, results)=>{
           if(err){
               return callback(err);
           }
           if(results.affectedRows > 0){
               return callback(null, true);
           }
           else{
            return callback(null, false);
           }
       }
    )


  
}
//根据email查询用户
exports.getByEmail = (email, callback)=>{

    db.query(
        'select * from `users`  where `email` =?',
        email,
        (err,results)=>{
            if(err){
                return callback(err);
            }
           if(results.length > 0 ){
               callback(null, results[0]);
           }else{
            callback(null, null);
           }
        }
    )
};
// 根据nickname查询用户
exports.getByNickname = (nickname, callback) => {
    db.query(
      'select * from `users` where `nickname`=?',
      nickname,
      (err, results) => {
        if (err) {
          return callback(err);
        }
        if (results.length > 0) {
          // nickname要求是唯一的，不能重复的
          // 所以根据nickname只能查询到一个用户信息
          callback(null, results[0]);
        } else {
          callback(null, null);
        }
      }
    );
  };