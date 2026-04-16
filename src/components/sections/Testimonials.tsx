interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatarColor: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "I stopped using Trello and Notion after this. The AI task breakdown alone saves me hours.",
    name: "Sara Rodriguez",
    role: "Head of Product, Vercel",
    initials: "SR",
    avatarColor: "#4fffb0",
  },
  {
    quote:
      "The Kanban system is super smooth. Managing projects actually feels easy now.",
    name: "James Kim",
    role: "Engineering Lead, Linear",
    initials: "JK",
    avatarColor: "#3b82f6",
  },
  {
    quote:
      "Simple, fast, and exactly what I needed. No unnecessary features.",
    name: "Maya Patel",
    role: "COO, Loom",
    initials: "MP",
    avatarColor: "#f59e0b",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-[5%] bg-[#0d1220]">
      <p className="text-center text-[#4fffb0] text-[0.82rem] uppercase tracking-[3px] font-semibold mb-4">
        What teams say
      </p>
      <h2
        className="font-syne font-extrabold text-center tracking-[-1px] leading-[1.15] max-w-0.5-[600px] mx-auto mb-4"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
      >
        Built for real teams. Loved by real people.
      </h2>
      <p className="text-center text-[#8892a4] max-w-130 mx-auto mb-14 leading-[1.7]">
        Don&apos;t take our word for it.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-250 mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-[#111827] border border-white/[0.07] rounded-3xl p-7 hover:-translate-y-0.75 transition-transform duration-300"
          >
            <div className="text-[#f59e0b] text-[0.9rem] mb-4">★★★★★</div>
            <p className="text-[#8892a4] text-[0.93rem] leading-[1.7] italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-5">
              <div
                className="w-9.5 h-9.5 rounded-full flex items-center justify-center font-bold text-[0.9rem] text-[#050a10] shrink-0"
                style={{ background: t.avatarColor }}
              >
                {t.initials}
              </div>
              <div>
                <strong className="text-[0.9rem] block text-[#f0f4ff]">{t.name}</strong>
                <span className="text-[0.8rem] text-[#8892a4]">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}