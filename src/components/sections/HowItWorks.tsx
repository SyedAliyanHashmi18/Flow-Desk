const steps = [
  {
    num: "1",
    title: "Create your project",
    desc: "Start by creating a project and organizing your workflow.",
  },
  {
    num: "2",
    title: "Add tasks or use AI",
    desc: "Manually add tasks or let AI generate structured tasks instantly.",
  },
  {
    num: "3",
    title: "Set priorities & deadlines",
    desc: "Assign importance levels and due dates to stay on track.",
  },
  {
    num: "4",
    title: "Manage with Kanban",
    desc: "Visualize your workflow and manage tasks with our intuitive Kanban board.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-[5%] bg-[#0d1220]" id="how">
      <p className="text-center text-[#4fffb0] text-[0.82rem] uppercase tracking-[3px] font-semibold mb-4">
        Simple process
      </p>
      <h2
        className="font-syne font-extrabold text-center tracking-[-1px] leading-[1.15] max-w-150 mx-auto mb-4"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
      >
        Up and running in minutes
      </h2>
      <p className="text-center text-[#8892a4] max-w-130 mx-auto mb-14 leading-[1.7]">
        No lengthy onboarding. No technical setup. Just sign up and go.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-225 mx-auto">
        {steps.map((step) => (
          <div key={step.num} className="text-center p-6">
            <div className="w-[5
            2px] h-13 rounded-full bg-linear-to-br from-[#4fffb0] to-[#3b82f6] text-[#050a10] font-syne font-extrabold text-[1.3rem] flex items-center justify-center mx-auto mb-5">
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