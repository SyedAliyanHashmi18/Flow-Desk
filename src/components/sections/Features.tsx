const features = [
  {
    icon: "⚡",
    title: "Flexible Project Workspaces",
    desc: "Create up to 10 projects on the free plan or go unlimited with Pro. Organize everything your way — simple, clean, and scalable.",
  },
  {
    icon: "📊",
    title: "Real-time Dashboards",
    desc: "Live charts, project tasks, and their status visible in real-time.",
  },
  {
    icon: "⚒️",
    title: "Powerful Task Management",
    desc: "Break projects into tasks, assign deadlines, set priorities, and track progress without the chaos.",
  },
  {
    icon: "🤖",
    title: "AI-Generated Task Breakdown",
    desc: "Describe your goal and let AI instantly generate structured tasks with deadlines and priorities — no manual planning needed.",
  },
  {
    icon: "↔️",
    title: "Drag & Drop Kanban",
    desc: "Move tasks from Pending → In Progress → Completed with a simple drag. Visualize your workflow in seconds.",
  },
  {
    icon: "📱",
    title: "Stay on Track",
    desc: "Set priority levels and deadlines so your team always knows what matters most.",
  },
];

export function Features() {
  return (
    <section className="py-24 px-[5%]" id="features">
      <p className="text-center text-[#4fffb0] text-[0.82rem] uppercase tracking-[3px] font-semibold mb-4">
        Everything you need
      </p>
      <h2
        className="font-syne font-extrabold text-center tracking-[-1px] leading-[1.15] max-w-150 mx-auto mb-4"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
      >
        Built for teams who move fast
      </h2>
      <p className="text-center text-[#8892a4] max-w-130 mx-auto mb-14 leading-[1.7]">
        No bloat, no complexity. Just the tools your team actually needs —
        beautifully integrated.
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