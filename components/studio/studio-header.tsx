"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";

import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import { PremiumSurface } from "@/components/ui/premium-surface";

const overlayTransition = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1] as const,
};

const menuListVariants = {
  closed: {},
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.06,
    },
  },
};

const menuItemVariants = {
  closed: { opacity: 0, y: 18 },
  open: { opacity: 1, y: 0, transition: overlayTransition },
};

function subscribe() {
  return () => {};
}

type StudioHeaderProps = {
  navigationItems: StudioHomepageNavItem[];
};

// The header keeps desktop navigation calm while letting mobile users open a full-screen overlay menu.
export function StudioHeader({ navigationItems }: StudioHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    document.body.dataset.mobileNavOpen = isMenuOpen ? "true" : "false";

    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.mobileNavOpen;
    };
  }, [isMenuOpen]);

  function handleNavClick() {
    setIsMenuOpen(false);
  }

  const overlay = (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          key="mobile-nav-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] lg:hidden"
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={handleNavClick}
            className="absolute inset-0 bg-white/20 backdrop-blur-2xl"
          />

          <div className="absolute inset-0 overflow-y-auto">
            <div className="min-h-full px-6 pb-10 pt-4">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto flex max-w-7xl items-center justify-between"
              >
                <Link href="/" onClick={handleNavClick}>
                  <Image
                    src="/assets/logo.svg"
                    alt="Logo"
                    width={150}
                    height={50}
                  />
                </Link>

                <button type="button" aria-label="Close menu" onClick={handleNavClick}>
                  <X />
                </button>
              </motion.div>

              <PremiumSurface
                asChild
                tone="glass"
                elevation="lg"
                className="mx-auto mt-6 max-w-7xl p-3"
              >
                <motion.nav
                  variants={menuListVariants}
                  initial="closed"
                  animate="open"
                >
                  {navigationItems.map((item) => (
                    <motion.div key={item.label} variants={menuItemVariants}>
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        className={`flex justify-between rounded-xl px-5 py-6 text-2xl transition ${
                          pathname === item.href
                            ? "bg-black text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {item.label}
                        <ArrowUpRight size={18} />
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
              </PremiumSurface>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              alt="Logo"
              width={180}
              height={60}
              className="w-[150px]"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-4 lg:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-md px-3 py-1.5 text-sm transition ${
                  pathname === item.href
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {isMounted && createPortal(overlay, document.body)}
    </>
  );
}
