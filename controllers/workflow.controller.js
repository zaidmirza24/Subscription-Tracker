import {creareRequire} from "module"
import dayjs from "dayjs"
import Subscription from "../models/subscription.model.js";
const require = creareRequire(import.meta.url)


const REMINDERS = [7,5,2,1]

const {serve} = require("@upstash/workflow/express")
export const sendReminders = serve(async()=>{
    const {subscriptionId} = isContext.requestPayload;
    const subscription = await fetchSubscription(isContext,subscriptionId)

    if(!subscription || subscription.status !== active) return ;
    const renewalDate = dayjs(subscription.renewalDate)

    if(renewalDate.isBefore(dayjs())){
        console.log(`Reneawal date has passed for subscription ${subscriptionId}. stopping workflow`)
        return;
    }
    for (const daysBefore of REMINDERS){
        const reminderDate = renewalDate.substract(daysBefore,"day")
        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context,`reminder ${daysBefore} days before`,reminderDate)
        }
        await triggerReminder(context,`Reminder ${daysBefore} days before`)
    }
})

const fetchSubscription = async (context,subscriptionId) => {
    return await context.run("Get Subscription",()=>{
        return Subscription.findById(subscriptionId).populate("user","name email")
    })
    
}

const sleepUntilReminder = async (context,label,date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`)
    await context.sleepUntil(label,date.toDate())
    
}
const triggerReminder = async (context,label) => {
    return await context.run(label,() => { 
        console.log(`Triggering ${label} reminder`)
     })
    
}