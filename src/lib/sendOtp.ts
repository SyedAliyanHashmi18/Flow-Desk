import emailjs from "@emailjs/browser";

export const sendOtp = async (email: string, otp: number) => {
  try {
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        to_email: email,
        otp: otp,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    console.log("EMAIL SENT:", result);
    return { success: true };

  } catch (error: any) {
    console.error("EmailJS error:", error);
    return { success: false, message: error.text };
  }
};