import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true для 465, false для 587
  auth: {
    user: process.env.EMAIL_USER, // Твой email
    pass: process.env.EMAIL_PASS, // Пароль (App Password для Gmail)
  },
});

export const sendVerificationEmail = async (email: string, code: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verification code",
      text: `You verification code: ${code}. It is valid 24 hours.`,
      html: `<p>You verification code: <strong>${code}</strong></p><p>It is valid 24 hours.</p>`,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send an email");
  }
};
