import { db } from "@/lib/db";

export const getPasswordResetTokenbyToken=async(token:string)=>{
    try {
        const passwordToken= await db.passwordResetToken.findUnique({
            where:{
                token
            }
        })

        return passwordToken
    } catch (error) {
        
    }
}

export const getPasswordResetTokenbyEmail=async(email:string)=>{
    try {
        const passwordToken= await db.passwordResetToken.findFirst({
            where:{
                email
            }
        })

        return passwordToken
    } catch (error) {
        
    }
}