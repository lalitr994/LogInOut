var passport = require('passport');
var mongoose = require('mongoose');

var User = mongoose.model('User')

module.exports.register = (req, res) => {
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);
    user.save((err) => {
        var token = user.generateJwt();
        res.status(200);
        res.json({ 'token': token })
    })
}


module.exports.login = (req, res)=>{   
    passport.authenticate('local',(err,user,info)=>{
        var token;
        if (err) {
            res.status(400).json(err);
            return;
        }

        if (user){
            token = user.generateJwt();
            res.status(200),
            res.json({
                "token": token
            })
         }else{
            res.status(401).json(info);
         }
    })(req, res)


}


