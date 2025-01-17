const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) =>{
    const token = req.cookies.accessToken

    if(!token){
        return res.status(401).json({success:false, message:"You're not authorized"})
    }

    jwt.verify(token, "masai", (err, user)=>{
        if(err){
            res.status(401).json({success:false, message:"Token is invalid"})
        }
        req.user = user;
        next()
    })
};

const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.id === req.params.id || req.user.role === 'admin'){
            next()
        }
        else{
            return res.status(401).json({success:false, message:"You're not authenticated"})
        }
    })
};

const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.role === 'admin'){
            next()
        }
        else{
            return res.status(401).json({success:false, message:"You're not authorized"})
        }
    })
};

module.exports={
    verifyToken,
    verifyAdmin,
    verifyUser
}