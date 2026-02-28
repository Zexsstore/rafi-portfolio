"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, PROFILE } from "@/lib/data";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "rounded-2xl px-3 py-2 text-sm transition border",
        active
          ? "bg-white/10 border-white/15 text-white"
          : "border-transparent text-zinc-300 hover:text-white hover:bg-white/5",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

function IconBtn({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) {
  const isMail = href.startsWith("mailto:");
  return (
    <a
      className="p-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
      href={href}
      title={title}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noreferrer"}
    >
      {children}
    </a>
  );
}

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <div className="min-h-screen">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          {/* Brand (lebih readable + tidak “berantakan”) */}
          <Link href="/" className="group flex items-center gap-3 min-w-0">
<div className="relative h-10 w-10 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
  <Image
    src={PROFILE.photoNav}
    alt={`Foto ${PROFILE.name}`}
    fill
    sizes="40px"
    className="object-cover transition duration-300 group-hover:scale-[1.03]"
    priority={false}
  />
  {/* ring glow halus biar premium */}
  <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
</div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold leading-tight truncate">
                  {PROFILE.name}
                </span>
                <span className="hidden sm:inline-block rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-zinc-300">
                  STI
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-snug max-w-[180px] sm:max-w-none line-clamp-2">
                {PROFILE.role}
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={path === item.href}
              />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <IconBtn href={PROFILE.waLink} title="WhatsApp">
              <Phone size={16} />
            </IconBtn>
            <IconBtn href={`mailto:${PROFILE.email}`} title="Email">
              <Mail size={16} />
            </IconBtn>
            <IconBtn href="#" title="GitHub">
              <Github size={16} />
            </IconBtn>
            <IconBtn href="#" title="LinkedIn">
              <Linkedin size={16} />
            </IconBtn>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-3 flex gap-2 overflow-x-auto">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "whitespace-nowrap rounded-2xl px-3 py-2 text-sm border transition",
                  path === item.href
                    ? "bg-white/10 border-white/15 text-white"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="pb-16">{children}</main>

      {/* FOOTER (center + links + CTA) */}
      <footer className="border-t border-white/10 mt-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="glass soft-shadow rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm text-zinc-300 font-medium">
                  {PROFILE.name}
                </p>
                <p className="text-sm text-zinc-400 mt-1">
                  {PROFILE.role}  {PROFILE.campus}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl px-4 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  className="rounded-2xl px-4 py-2 text-sm font-semibold bg-gradient-to-r from-sky-400 to-violet-400 text-zinc-950 hover:brightness-110 transition"
                  href={PROFILE.waLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Chat WhatsApp
                </a>
                
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-zinc-400">
               Portfolio {new Date().getFullYear()} {PROFILE.name}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}