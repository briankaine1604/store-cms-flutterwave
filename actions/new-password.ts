"use server"

import { NewPasswordSchema } from "@/Schemas";
import { getPasswordResetTokenbyToken } from "@/data/passwordResetToken";
import { getUserbyEmail } from "@/data/user";
import { db } from "@/lib/db";
import { error } from "console";
import * as z from 'zod'
import bcryptjs from "bcryptjs"



export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string|null) => {
        if(!token){
            return {error:"Missing Token!"}
        }

        const validatedFields= NewPasswordSchema.safeParse(values)

        if(!validatedFields.success){
            return{error:"Invalid Fields!"}
        }

        const {password}= validatedFields.data
        const existingToken = await getPasswordResetTokenbyToken(token)

        if(!existingToken){
            return{error:"Invalid token!"}
        }

        const hasExpired = new Date(existingToken.expires) < new Date();

        if (hasExpired) {
        return { error: "Token has expired!" };
         }


        const existingUser= await getUserbyEmail(existingToken.email)

        if(!existingUser){
            return{error: "Email does not exist!"}
        }

        const hashedPassword=await bcryptjs.hash(password,10)

        await db.user.update({
            where:{
                id: existingUser.id
            },
            data:{
                password:hashedPassword
            }
        })

        await db.passwordResetToken.delete({
            where:{
                id:existingToken.id
            }
        })

        return {success:"Password updated!"}
};
