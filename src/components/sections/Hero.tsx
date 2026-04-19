'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";

const stats = [
  { num: "10 Projects", label: "Free plan." },
  { num: "Unlimited tasks", label: "Core Feature" },
  { num: "AI powered", label: "Differentiator" },
  { num: "Kanban workflow", label: "Visualize your work" },
];

export function Hero() {
  const { data: session } = useSession();
    const user = session?.user;
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-[5%] pt-32 pb-20 relative">
      {/* Glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(78,255,176,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
        }}
      />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-[rgba(78,255,176,0.08)] border border-[rgba(78,255,176,0.2)] text-[#4fffb0] rounded-full px-4 py-[0.4rem] text-[0.82rem] font-semibold mb-7 animate-fade-up">
        <span className="text-[0.5rem]">●</span>
        Built for creators, developers & fast-moving teams
      </div>

      <h1
        className="font-syne font-extrabold leading-[1.08] tracking-[-2px] max-w-205 animate-fade-up"
        style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", animationDelay: "0.1s" }}
      >
       Manage project&apos;s. Track tasks. Ship faster.
        <span className="block text-[#4fffb0]">All in one smart workspace.</span>
      </h1>

      <p
        className="mt-5 text-[#8892a4] text-[1.15rem] max-w-140 leading-[1.7] animate-fade-up"
        style={{ animationDelay: "0.2s" }}
      >
        Plan, organize, and execute your work in one place. Create projects, break them into tasks, assign priorities, and let AI structure everything for you — so you never miss a deadline again.
      </p>

      <div
        className="flex gap-4 mt-10 flex-wrap justify-center animate-fade-up"
        style={{ animationDelay: "0.3s" }}
      >
        
        {!user ? (
              <>
                <Link
          href="/register"
          className="bg-[#4fffb0] text-[#050a10] px-8 py-[0.85rem] rounded-[10px] font-bold text-base hover:-translate-y-0.5 transition-all shadow-[0_0_30px_rgba(78,255,176,0.25)] hover:shadow-[0_0_40px_rgba(78,255,176,0.4)]"
        >
          Start for free →
        </Link>
                
              </>
            ) : (
              <></>
            )}
        <Link
          href="#how"
          className="bg-transparent border border-white/[0.07] text-[#f0f4ff] px-8 py-[0.85rem] rounded-[10px] font-medium text-base hover:border-white/20 hover:bg-white/4 transition-all"
        >
          See how it works
        </Link>
      </div>

      <div
        className="flex gap-12 mt-16 flex-wrap justify-center animate-fade-up"
        style={{ animationDelay: "0.4s" }}
      >
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-syne font-extrabold text-[2rem] text-[#f0f4ff]">
              {s.num}
            </div>
            <div className="text-[#8892a4] text-[0.85rem] mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}