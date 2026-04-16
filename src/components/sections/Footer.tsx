import Link from "next/link";

const footerLinks = [
  { href: "#", label: "Product" },
  { href: "#pricing", label: "Pricing" },
  { href: "#", label: "Blog" },
  { href: "#", label: "Careers" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] px-[5%] py-12 flex justify-between items-center flex-wrap gap-6">
      <div className="font-syne font-extrabold text-[1.3rem]">
        Flow<span className="text-[#4fffb0]">Desk</span>
      </div>

      <div className="flex gap-6 flex-wrap">
        {footerLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-[#8892a4] text-[0.88rem] hover:text-[#f0f4ff] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <p className="text-[#8892a4] text-[0.82rem]">
        © 2025 FlowDesk, Inc. All rights reserved.
      </p>
    </footer>
  );
}