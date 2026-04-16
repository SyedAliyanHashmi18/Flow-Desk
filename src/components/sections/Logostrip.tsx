"use client";

// ── LogoStrip ──────────────────────────────────────────────────────────────
const logos = ["Stripe", "Vercel", "Notion", "Linear", "Figma", "Loom"];

export function LogoStrip() {
  return (
    <div className="py-12 px-[5%] border-t border-b border-white/[0.07]">
      <p className="text-center text-[#8892a4] text-[0.82rem] uppercase tracking-[2px] mb-8">
        Loved by teams at
      </p>
      <div className="flex gap-12 items-center justify-center flex-wrap">
        {logos.map((name) => (
          <span
            key={name}
            className="font-syne font-bold text-[1.1rem] text-white/20 tracking-tight hover:text-white/50 transition-colors cursor-default"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Features ───────────────────────────────────────────────────────────────
const features = [
  {
    icon: "⚡",
    title: "Smart Task Automation",
    desc: "Set triggers, conditions, and actions once — let FlowDesk handle the rest. Save hours every single week.",
  },
  {
    icon: "📊",
    title: "Real-time Dashboards",
    desc: "Live KPIs, project health, and team velocity — all visible in one customizable command center.",
  },
  {
    icon: "🔗",
    title: "200+ Integrations",
    desc: "Connect Slack, GitHub, Figma, Notion, and more. FlowDesk plays nicely with your entire stack.",
  },
  {
    icon: "🤖",
    title: "AI Writing Assistant",
    desc: "Draft docs, summarize threads, and auto-generate task descriptions. Your AI teammate, built in.",
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    desc: "SOC2 Type II, GDPR compliant. Role-based access, SSO, and audit logs — security built to scale.",
  },
  {
    icon: "📱",
    title: "Mobile-first Design",
    desc: "Manage your team from anywhere. Native iOS and Android apps, perfectly synced with your desktop.",
  },
];

export function Features() {
  return (
    <section className="py-24 px-[5%]" id="features">
      <p className="text-center text-[#4fffb0] text-[0.82rem] uppercase tracking-[3px] font-semibold mb-4">
        Everything you need
      </p>
      <h2 className="font-syne font-extrabold text-center tracking-[-1px] leading-[1.15] max-w-150 mx-auto mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
        Built for teams who move fast
      </h2>
      <p className="text-center text-[#8892a4] max-w-130 mx-auto mb-14 leading-[1.7]">
        No bloat, no complexity. Just the tools your team actually needs — beautifully integrated.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-275 mx-auto">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-[#111827] border border-white/[0.07] rounded-3xl p-8 cursor-default hover:-translate-y-1 hover:border-[rgba(78,255,176,0.2)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-[rgba(78,255,176,0.1)] rounded-2xl flex items-center justify-center text-2xl mb-5">
              {f.icon}
            </div>
            <h3 className="font-syne font-bold text-[1.1rem] mb-2">{f.title}</h3>
            <p className="text-[#8892a4] text-[0.92rem] leading-[1.65]">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── HowItWorks ─────────────────────────────────────────────────────────────
const steps = [
  {
    num: "1",
    title: "Create your workspace",
    desc: "Sign up, invite your team, and set up your first project in under 5 minutes.",
  },
  {
    num: "2",
    title: "Connect your tools",
    desc: "Integrate with the tools you already love — GitHub, Slack, Figma, and more.",
  },
  {
    num: "3",
    title: "Automate your workflow",
    desc: "Set up smart automations that eliminate repetitive work and keep everyone aligned.",
  },
  {
    num: "4",
    title: "Ship faster, together",
    desc: "Track progress in real-time, hit deadlines, and celebrate every launch.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-[5%] bg-[#0d1220]" id="how">
      <p className="text-center text-[#4fffb0] text-[0.82rem] uppercase tracking-[3px] font-semibold mb-4">
        Simple process
      </p>
      <h2 className="font-syne font-extrabold text-center tracking-[-1px] leading-[1.15] max-w-150 mx-auto mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
        Up and running in minutes
      </h2>
      <p className="text-center text-[#8892a4] max-w-130 mx-auto mb-14 leading-[1.7]">
        No lengthy onboarding. No technical setup. Just sign up and go.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-225 mx-auto">
        {steps.map((step, i) => (
          <div key={step.num} className="text-center p-6" style={{ animationDelay: `${i * 0.12}s` }}>
            <div className="w-13 h-13 rounded-full bg-linear-to-br from-[#4fffb0] to-[#3b82f6] text-[#050a10] font-syne font-extrabold text-[1.3rem] flex items-center justify-center mx-auto mb-5">
              {step.num}
            </div>
            <h3 className="font-syne font-bold text-[1.05rem] mb-2">{step.title}</h3>
            <p className="text-[#8892a4] text-[0.9rem] leading-[1.6]">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}