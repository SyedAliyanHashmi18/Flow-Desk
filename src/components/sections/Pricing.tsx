import Link from "next/link";
import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  price: string;
  period?: string;
  desc: string;
  features: string[];
  cta: string;
  popular?: boolean;
  filled?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    desc: "Perfect for solo builders and small teams just getting started.",
    features: [
      "Up to 3 members",
      "Up to 10 projects",
      "Basic AI task generation",
      "Kanban board",
      "Community support",
      "Unlimited tasks",

    ],
    cta: "Get started free",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    desc: "For power users who want unlimited projects and smarter AI workflows.",
    features: [
      "Unlimited projects",
      "Unlimited tasks",
      "Advanced AI task generation",
      "Priority & deadline controls",
      "Kanban + future features",
      "Priority support",
    ],
    cta: "Start free trial",
    popular: true,
    filled: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For large organizations with advanced security and compliance needs.",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "SOC2 compliance",
      "Dedicated CSM",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Talk to sales",
  },
];

export function Pricing() {
  return (
    <section className="py-24 px-[5%]" id="pricing">
      <p className="text-center text-[#4fffb0] text-[0.82rem] uppercase tracking-[3px] font-semibold mb-4">
        Transparent pricing
      </p>
      <h2
        className="font-syne font-extrabold text-center tracking-[-1px] leading-[1.15] max-w-150 mx-auto mb-4"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
      >
        Simple plans for every team
      </h2>
      <p className="text-center text-[#8892a4] max-w-130 mx-auto mb-14 leading-[1.7]">
        Start free. Upgrade when you&apos;re ready. No surprises, ever.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-225 mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "bg-[#111827] border rounded-3xl p-10 relative transition-transform duration-300 hover:-translate-y-1",
              plan.popular
                ? "border-[#4fffb0] shadow-[0_0_40px_rgba(78,255,176,0.12)]"
                : "border-white/[0.07]"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3.25 left-1/2 -translate-x-1/2 bg-[#4fffb0] text-[#050a10] text-[0.75rem] font-bold px-4 py-[0.3rem] rounded-full whitespace-nowrap">
                ⭐ Most Popular
              </div>
            )}

            <div className="font-syne font-bold text-[#8892a4] uppercase tracking-[1px] text-sm mb-4">
              {plan.name}
            </div>
            <div className="font-syne font-extrabold text-[3rem] leading-none mb-1">
              {plan.price}
              {plan.period && (
                <span className="text-base text-[#8892a4] font-normal">
                  {plan.period}
                </span>
              )}
            </div>
            <p className="text-[#8892a4] text-[0.9rem] mt-3 mb-6">{plan.desc}</p>

            <ul className="flex flex-col gap-3 mb-8">
              {plan.features.map((feat) => (
                <li
                  key={feat}
                  className="flex items-center gap-2 text-[0.92rem] text-[#8892a4]"
                >
                  <span className="text-[#4fffb0] font-bold">✓</span>
                  {feat}
                </li>
              ))}
            </ul>

            <Link
              href="#cta"
              className={cn(
                "block w-full text-center py-[0.85rem] rounded-[10px] font-bold text-[0.95rem] transition-all hover:opacity-85 hover:-translate-y-px",
                plan.filled
                  ? "bg-[#4fffb0] text-[#050a10]"
                  : "bg-transparent border border-white/[0.07] text-[#f0f4ff]"
              )}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}