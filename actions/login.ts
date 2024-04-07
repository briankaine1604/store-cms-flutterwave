"use server";
import * as z from "zod";
import { LoginSchema } from "@/Schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import { getUserbyEmail } from "@/data/user";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/mail";
import { getTwoFactorTokenbyEmail } from "@/data/twoFactorToken";
import { error } from "console";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationbyUserId } from "@/data/two-factor-confimation";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserbyEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twofactorToken = await getTwoFactorTokenbyEmail(existingUser.email);
      if (!twofactorToken) {
        return { error: "Invalid token !" };
      }
      if (twofactorToken.token !== code) {
        return { error: "Invalid token !" };
      }
      const hasExpired = new Date(twofactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Token has expired!" };
      }

      await db.twoFactorToken.delete({
        where: { id: twofactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationbyUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(
        (
          await twoFactorToken
        ).email,
        (
          await twoFactorToken
        ).token
      );
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };

        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
