import UserModel from "../Schemas/UserAdminSchema";

export const upgradeSubscription=async(req,res)=>{
    try {
        const userId=req.userId;
        const {plan}=req.body;

        const allowedPlans=["BASIC","ADVANCED"];
        if(!allowedPlans.includes(plan)){
            return res.json({message:'Invalid Plan Selected!!',status:false})
        }

        const user=await UserModel.findById(userId);
        if(!user){
            return res.json({message:'User not found!!',status:false})
        }

        const planPriority={
            FREE:0,
            BASIC:1,
            ADVANCED:2
        }

        if(planPriority[plan]<=planPriority[user.subscriptionPlan]){
            return res.json({message:'You already have this plan or a higher plan',status:false})
        }

        user.subscriptionPlan=plan;
        await user.save();

        return res.json({message:`Subscription Plan upgraded to ${plan}`,status:true,subscriptionPlan:plan})
    } catch (error) {
        return res.json({message:error.message,status:false})
    }
}