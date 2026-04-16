"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What’s included in the free plan?",
    a: "Yes! Every paid plan comes with a 14-day free trial, no credit card required. You can upgrade, downgrade, or cancel anytime.",
  },
  {
    q: "How does AI task generation work?",
    a: "Just describe your goal, and FlowDesk will automatically create structured tasks with priorities and deadlines.",
  },
  {
    q: "Can I upgrade anytime?",
    a: "Yes, you can upgrade to Pro anytime to unlock unlimited projects and advanced AI features.",
  },
  {
    q: "Is this suitable for solo users?",
    a: "Absolutely. FlowDesk is perfect for freelancers, students, and teams.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 px-[5%]" id="faq">
      <p className="text-center text-[#4fffb0] text-[0.82rem] uppercase tracking-[3px] font-semibold mb-4">
        Got questions?
      </p>
      <h2
        className="font-syne font-extrabold text-center tracking-[-1px] leading-[1.15] max-w-150 mx-auto mb-4"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
      >
        Frequently asked
      </h2>
      <p className="text-center text-[#8892a4] max-w-130 mx-auto mb-14 leading-[1.7]">
        Everything you need to know before getting started.
      </p>

      <Accordion type="single" collapsible className="max-w-175 mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="bg-[#111827] border border-white/[0.07] rounded-3xl overflow-hidden px-6"
          >
            <AccordionTrigger className="text-[#f0f4ff] text-[0.98rem] font-medium hover:no-underline py-5 text-left">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-[#8892a4] text-[0.92rem] leading-[1.7] pb-5">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}