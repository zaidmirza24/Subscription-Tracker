import Subscription from "../models/subscription.model.js"
import User from "../models/user.model.js"
export const createSubscription = async (req,res,next) =>{
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        })
        res.status(201).json({success:true,
            data:subscription
        })
    } catch (error) {
        next(error)
        
    }
}

export const getUserSubscriptions = async (req,res,next) => {
    try {
        if(req.user.id !== req.params.id){
            const error = new Error("You are not the owner of this account")
            error.status = 401
            throw error
        }

        const userSubscriptions = await Subscription.find({user:req.params.id})

        res.status(200).json({
            success:true,
            data:userSubscriptions,
        })
        
    } catch (error) {
        next(error)
        
    }
}
export const deleteSubscription = async (req,res,next) => {
    try {
        const subs = await Subscription.deleteMany({user:req.user.id})
        res.status(200).json({
            success:true,
            data:subs,
        })
        
    } catch (error) {
        next(error)
        
    }
}