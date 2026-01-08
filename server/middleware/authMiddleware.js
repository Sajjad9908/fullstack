import { clerkClient } from "@clerk/express";

export const ProtectEducator=async(req,res,next)=>{
    try {
        const userId=req.auth().userId;
        const responce=await clerkClient.users.getUser(userId);
        if(responce.publicMetadata.role!=="educator"){
            return res.json({success:false, message:"You are not authorized to access this route"})
        }
       return next();
    } catch (error) {
        res.json({success:false, message:error.message});

    }
}