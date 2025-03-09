const jwt = require('jsonwebtoken');
const User = require('../model/user')

const authJwt = async(req,res,next) => {
    const token = req.cookies.jwt;
    if(!token){
        return res.status(403).json({message: 'Token not provided'});
    }else{
        try{
            const decoded = jwt.verify(token, process.env.KEY);
            const user = await User.findById(decoded.id);
            if(!user){
                return res.status(403).json({message: 'User not found'});
            }
            req.user = user;
            next();
        }catch(e){
            return res.status(403).json({message: 'Token is not valid'});
        }
    }
   
}

module.exports = authJwt;