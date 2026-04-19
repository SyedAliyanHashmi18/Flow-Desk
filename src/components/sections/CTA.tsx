"use client";

import { Link } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export function CTA() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  function handleSubmit() {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setMessage({ text: "Please enter a valid email address.", isError: true });
      return;
    }
    setMessage({ text: `🎉 You're on the list! We'll be in touch at ${trimmed}`, isError: false });
    setEmail("");
  }
  const { data: session } = useSession();
    const user = session?.user;

  return (
    <section
      className="py-24 px-[5%] text-center relative overflow-hidden"
      id="cta"
      style={{ background: "linear-gradient(180deg, #080b14 0%, #05120d 100%)" }}
    >
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 300,
          background: "radial-gradient(ellipse, rgba(78,255,176,0.15) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <h2
        className="font-syne font-extrabold tracking-[-1.5px] max-w-175 mx-auto mb-4 relative"
        style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
      >
        Ready to organize your work the smart way?
      </h2>
      <p className="text-[#8892a4] mb-10 text-[1.05rem] relative">
        Start managing your projects, tasks, and workflows in one place — free forever.
      </p>

      

      {message && (
        <p
          className="mt-4 text-[0.9rem] relative"
          style={{ color: message.isError ? "#f87171" : "#4fffb0" }}
        >
          {message.text}
        </p>
      )}
    </section>
  );
}