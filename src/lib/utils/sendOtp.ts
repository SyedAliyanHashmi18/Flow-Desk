import emailjs from "@emailjs/browser";

export const sendOtp = async (email: string, otp: number) => {
  try {
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      { to_email: email, otp },
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
    );
    console.log("EmailJS Response:", response.text);
    return true;
  } catch (err: any) {
    console.error("Error sending OTP:", err);
    return false;
  }
};