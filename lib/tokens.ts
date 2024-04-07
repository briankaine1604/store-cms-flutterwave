import { getVerificationTokenbyEmail } from "@/data/verificationToken";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenbyEmail } from "@/data/passwordResetToken";
import crypto from "crypto"
import { getTwoFactorTokenbyEmail } from "@/data/twoFactorToken";


export const generateTwoFactorToken =async(email:string)=>{
  const token= crypto.randomInt(100_000,1_000_000).toString()// same as 100000
  const currentDateTime = new Date();
  const expires = new Date(currentDateTime.getTime() + 10 * 60 * 1000);
  expires.setHours(expires.getHours() + 1);

  const existingToken = await getTwoFactorTokenbyEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken= await db.twoFactorToken.create({
    data:{
      email,
      token,
      expires
    }
  })

  return twoFactorToken
}


export const generatePasswordResetToken=async(email:string)=>{
  const token = uuidv4()
  const currentDateTime = new Date();
  const expires = new Date(currentDateTime.getTime() + 3600 * 1000);
  expires.setHours(expires.getHours() + 1);

  const existingToken= await getPasswordResetTokenbyEmail(email)

  if(existingToken){
    await db.passwordResetToken.delete({
      where:{
        id:existingToken.id
      }
    })
  }

  const passwordResetToken= db.passwordResetToken.create({
    data:{
      email,token,expires
    }
  })

  return passwordResetToken
}

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const currentDateTime = new Date();
  const expires = new Date(currentDateTime.getTime() + 3600 * 1000);
  expires.setHours(expires.getHours() + 1);


  const existingToken = await getVerificationTokenbyEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
