import React from "react";
import { motion } from "framer-motion";

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

export function SectionTitle({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h2>
      {desc ? <p className="mt-2 text-muted">{desc}</p> : null}
    </div>
  );
}

/**
 * ✅ FIX:
 * Card sekarang menerima semua atribut <div>:
 * - id, className, onClick, style, aria-*, dll
 * Jadi <Card id="skills"> tidak error lagi.
 */
export function Card({
  children,
  className = "",
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      {...props}
      className={`glass soft-shadow rounded-3xl p-5 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function Button({
  children,
  href,
  onClick,
  variant = "ghost",
  type,
  className = "",
  disabled,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:opacity-50 disabled:pointer-events-none";

  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-sky-400 to-violet-400 text-zinc-950 hover:brightness-110"
      : "bg-white/5 border border-white/10 hover:bg-white/10";

  // kalau href, tetap link (external)
  if (href) {
    return (
      <a
        className={`${base} ${styles} ${className}`}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type ?? "button"}
      className={`${base} ${styles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// tetap sama seperti punyamu
export const FadeIn = motion.div;