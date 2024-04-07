import { db } from "@/lib/db";

export const getTwoFactorTokenbyToken= async(token:string)=>{
    try {
        const twoFactortoken= await db.twoFactorToken.findUnique({
            where:{
                token
            }
        })

        return twoFactortoken;
    } catch (error) {
        return null
    }
}

export const getTwoFactorTokenbyEmail= async(email:string)=>{
    try {
        const twoFactortoken= await db.twoFactorToken.findFirst({
            where:{
                email
            }
        })

        return twoFactortoken;
    } catch (error) {
        return null
    }
}