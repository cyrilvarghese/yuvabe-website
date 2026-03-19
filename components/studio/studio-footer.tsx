import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  work: [
    { label: "General Aeronautics", href: "/case-studies/general-aeronautics" },
    { label: "Bevolve AI", href: "/case-studies/bevolve" },
    { label: "TVAM", href: "/case-studies/tvam" },
    { label: "KittyKat", href: "/case-studies/kittykat" },
    { label: "AgeShift", href: "/case-studies/ageshift" },
  ],
  services: [
    { label: "Strategy", href: "/#about" },
    { label: "Product design", href: "/#about" },
    { label: "Engineering", href: "/#about" },
    { label: "AI integration", href: "/#about" },
    { label: "Growth marketing", href: "/#about" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/#work" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
};

const linkClassName =
  "text-body-sm text-(--color-text-secondary) transition-colors hover:text-(--color-text-primary)";

const headingClassName =
  "text-label-sm uppercase tracking-[0.18em] text-(--color-text-tertiary)";

export function StudioFooter() {
  return (
    <footer className="ds-surface-billing-aurora relative overflow-hidden border-t border-(--color-border-default)">
      {/* Ambient glows matching the hero section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-10%] h-144 w-xl rounded-full bg-[radial-gradient(circle,rgba(150,136,192,0.22)_0%,rgba(150,136,192,0.08)_40%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-6%] h-120 w-120 rounded-full bg-[radial-gradient(circle,rgba(88,41,199,0.10)_0%,rgba(88,41,199,0.03)_40%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* Main footer grid */}
        <div className="grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:py-20 lg:gap-16">
          {/* Brand column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/logo.svg"
                alt="Yuvabe"
                width={140}
                height={46}
              />
            </Link>
            <p className="max-w-[26ch] text-body-sm leading-7 text-(--color-text-secondary)">
              AI-first strategy, design, engineering, and growth marketing for startups moving fast.
            </p>
            <Link
              href="/#process"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-label-md text-white transition-colors hover:bg-[#4c24ab]"
            >
              Start a project
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          {/* Work column */}
          <div className="space-y-5">
            <p className={headingClassName}>Work</p>
            <ul className="space-y-3">
              {footerLinks.work.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div className="space-y-5">
            <p className={headingClassName}>Services</p>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="space-y-5">
            <p className={headingClassName}>Company</p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-(--color-border-default) py-7 sm:flex-row sm:items-center">
          <p className="text-body-sm text-(--color-text-tertiary)">
            &copy; {new Date().getFullYear()} Yuvabe Studios. All rights reserved.
          </p>
          <p className="text-body-sm text-(--color-text-tertiary)">
            Built with AI-first execution.
          </p>
        </div>
      </div>
    </footer>
  );
}
