import UserModel from "@/models/user";



export async function checkAIRateLimit(userId : string) {

  const user = await UserModel.findById(userId);

  if(!user) throw new Error ("User not found");

  if(user.plan === "free" && user.aiUsageCount >= 3){
    throw new Error("Daily AI limit reached");

  }

  user.aiUsageCount +=1;

  await user.save();
  
}