import jwt from 'jsonwebtoken'

const authMiddleware = (req,res,next) => {
  
const authHeader = req.headers.authorization;

if(!authHeader?.startsWith('Bearer ')){
    return res.status(401).json({msg:'no token provided'});
}
const token = authHeader.split(' ')[1];

try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
}
catch(err){
    return res.status(403).json({msg:"invalid token "});
}
}

export default authMiddleware;
