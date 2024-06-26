const jwt = require('jsonwebtoken');

    


const jwtAuthMiddleware = (req,res,next)=>{

    //first check the request headers has authorisation or not
    const authorization = req.headers.authorization
    if(!authorization){
        return res.status(401).json({error:"Token not found"})
    }
    //now extracting the jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'unauthorized'})
    try {
        //verify the jwt token
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        //attach user information to the request object
        req.user = decoded
        next()
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Invalid token'})
        
    }
}


//function to generate jwt token
const generateToken = (userData)=>{
    //generating a new JWT token using user data here
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000})
}


module.exports = {jwtAuthMiddleware,generateToken}