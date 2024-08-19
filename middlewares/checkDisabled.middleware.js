const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const checkDisabled = async (req,res,next) =>{
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if(token){
        jwt.verify(token,process.env.JWT_SECRETKEY1, async function(err,decoded){
            if(err){
                return res.status(404).json({
                    message:'Error verifying the token',
                    err
                })
            }
            const user = await userModel.findOne(decoded._id);
            if(user && !user.status){
                return res.status(403).json({
                    message:'This user is disabled'
                })
            };
            next();
        })
    }
}


module.exports = checkDisabled