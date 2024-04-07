"use server";

import { SettingsSchema } from "@/Schemas";
import { getUserbyEmail, getUserbyId } from "@/data/user";
import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { error } from "console";
import * as z from "zod";
import bcrypt from "bcryptjs";

export const Settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }
  if (!user.id) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserbyId(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserbyEmail(values.email);

    if (existingUser && existingUser.id === user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) {
      return { error: "Invalid password!" };
    }

    const hashedPassword = await bcrypt.hash(values.password, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings updated!" };
};
