import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const domain = process.env.NEXT_PUBLIC_APP_URL!;

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "brian-auth@briankaine.com",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  try {
    await resend.emails.send({
      from: "brian-auth@briankaine.com",
      to: email,
      subject: "Confirm your Email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm email</p>`,
    });
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending verification email to ${email}:`, error);
    return { error: "Failed to send verification email" };
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "brian-auth@briankaine.com",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> reset your password</p>`,
  });
};

export const sendPaymentSuccessfulEmail = async (email: string) => {
  try {
    await resend.emails.send({
      from: "Store@briankaine.com",
      to: email,
      subject: "Payment Successful",
      html: "<p>Your payment was successful. Thank you for your purchase!</p>",
    });
    console.log(`Payment successful email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending payment successful email to ${email}:`, error);
    return { error: "Failed to send payment successful email" };
  }
};
