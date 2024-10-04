const jwt =require("jsonwebtoken")

const auth = (req,res,next)=>{

    if(!req.headers.authorization){
        return res.status(403).json({
            success: false,
            message: `Forbidden`,
          });
    }

    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(token,process.env.SECRET,(err,result)=>{
        if(err){
            res.status(403).json({
                success: false,
                message: `The token is invalid or expired`,
              });
        }
        req.token=result;
        next()
        
    })
    
}

module.exports=auth