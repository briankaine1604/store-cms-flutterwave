"use server"

import { ResetSchema } from "@/Schemas"
import { getUserbyEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"
import * as z from "zod"


export const Reset=async(values:z.infer<typeof ResetSchema>)=>{

    const validatedFields = ResetSchema.safeParse(values)

    if (!validatedFields.success){
        return {error:"Invalid Email"}
    }

    const {email}= validatedFields.data

    const existingUser= await getUserbyEmail(email)

    if (!existingUser){
        return {error:"Email not found!"}
    }

   const passwordResetToken =await generatePasswordResetToken(email)
   await sendPasswordResetEmail(passwordResetToken.email,passwordResetToken.token) 

    return {success:"Reset email sent!"}
}