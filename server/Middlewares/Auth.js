import jwt from 'jsonwebtoken';

const Auth=async(req,res,next)=>{
    try {
        const token=req.headers.authorization;
        const auth=token.split(" ")[1];
        if(!auth){
            return res.json({message:'Token not provided!!',status:false});
        }
        const decode=jwt.verify(auth,process.env.SECRET_KEY);
        const {id}=decode;
        req.userId=id;
        next();
    } catch (error) {
       return res.json({message:error.message}) 
    }
}

export default Auth;