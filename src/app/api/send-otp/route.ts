// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { email, otp } = await req.json();

//     console.log("Sending OTP:", otp, "to", email);

//     const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
//       method: "POST",
//       headers: { "Content-Type": "application/json", },
//       body: JSON.stringify({
//         service_id: process.env.EMAILJS_SERVICE_ID,
//         template_id: process.env.EMAILJS_TEMPLATE_ID,
//         user_id: process.env.EMAILJS_USER_ID,
//         template_params: { to_email: email, otp },
//       }),
//     });

//     const data = await response.text();
//     console.log("EmailJS Response:", data);

//     if (!response.ok) {
//       throw new Error(`Failed to send email: ${data}`);
//     }

//     return NextResponse.json({ success: true, message: "OTP sent" });
//   } catch (err: any) {
//     console.error("SEND OTP ERROR:", err.message);
//     return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        publicKey: process.env.EMAILJS_PUBLIC_KEY,   // <-- required
        template_params: { to_email: email, otp },
      }),
    });

    const data = await response.text();
    console.log("EmailJS Response:", data);

    if (!response.ok) throw new Error(`Failed to send email: ${data}`);

    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch (err: any) {
    console.error("SEND OTP ERROR:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}