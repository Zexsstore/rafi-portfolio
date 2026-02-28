"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { PROFILE, ABOUT, PROJECTS, CERTS } from "@/lib/data";
import { Code2, Palette, Sparkles, Wand2 } from "lucide-react";
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa";


const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const floatAnim = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
  },
};

/** TypingName: caret mengikuti lebar teks (px) + hilang setelah selesai */
function TypingName({ text }: { text: string }) {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [caretX, setCaretX] = useState(0);

  const steps = useMemo(
    () => Math.max(18, Math.min(44, text.length + 8)),
    [text]
  );

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const measure = () => setCaretX(el.getBoundingClientRect().width);

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  return (
    <span className="typing-wrap" style={{ ["--caret-x" as any]: `${caretX}px` }}>
      <span
        ref={spanRef}
        className="typing text-transparent bg-gradient-to-r from-sky-300 via-violet-300 to-emerald-200 bg-clip-text drop-shadow-[0_0_22px_rgba(125,211,252,0.12)]"
        style={{ animationTimingFunction: `steps(${steps}, end)` }}
      >
        {text}
      </span>
      <span className="typing-caret" aria-hidden="true" />
    </span>
  );
}


const roleIcon = (key: string) => {
  const cls = "h-5 w-5";
  switch (key) {
    case "code":
      return <Code2 className={cls} />;
    case "palette":
      return <Palette className={cls} />;
    case "sparkles":
      return <Sparkles className={cls} />;
    case "wand":
      return <Wand2 className={cls} />;
    default:
      return <Sparkles className={cls} />;
  }
};

const techIcon = (key: string) => {
  const cls = "h-4 w-4";
  switch (key) {
    case "python": return <Code2 className={cls} />;
    case "js": return <Code2 className={cls} />;
    case "html": return <Code2 className={cls} />;
    case "css": return <Palette className={cls} />;
    case "next": return <Boxes className={cls} />;
    case "react": return <Boxes className={cls} />;
    case "tailwind": return <Boxes className={cls} />;
    case "vscode": return <PenTool className={cls} />;
    case "github": return <Boxes className={cls} />;
    case "canva": return <Palette className={cls} />;
    case "capcut": return <Video className={cls} />;
    case "figma": return <PenTool className={cls} />;
    default: return <Boxes className={cls} />;
  }
};

export default function Home() {
const START_YEAR = 2024;
const yearsLearning = Math.max(1, new Date().getFullYear() - START_YEAR);
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* HERO CARD */}
      <section className="mt-10 glass soft-shadow shine rounded-[32px] overflow-hidden relative">
        {/* background glow */}
        <div className="absolute inset-0">
          <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-sky-400/25 blur-3xl" />
          <div className="absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-violet-400/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        {/* subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.35) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />

        <div className="relative p-6 sm:p-10 flex flex-col-reverse lg:flex-row gap-8 lg:items-center lg:justify-between">
          {/* Left side */}
          <div className="max-w-2xl">
            {/* Replace “Halo, saya” with professional label */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0.05}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs sm:text-sm text-zinc-300"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
              <span>Sistem & Teknologi Informasi</span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0.12}
              className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight"
            >
              <TypingName text={PROFILE.name} />
            </motion.h1>

            {/* Professional summary (lebih meyakinkan HR) */}
{/* Professional summary */}
<motion.p
  initial="hidden"
  animate="show"
  variants={fadeUp}
  custom={0.20}
  className="mt-4 measure prose-justify text-zinc-300/90 text-[15.5px] sm:text-base leading-[1.85] tracking-[0.01em]"
>
  {PROFILE.role} di{" "}
  <span className="text-zinc-100/90 font-medium">{PROFILE.campus}</span>.{" "}
  Dengan latar belakang pendidikan dari MAPK Wachid Hasyim. Memiliki minat besar pada pengembangan teknologi dan sedang aktif mendalami dasar-dasar pemrograman, serta antusias mempelajari hal-hal baru.
</motion.p>

            {/* Mini stats */}
            <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
              {[
                { label: "Projects", value: String(PROJECTS.length) },
                { label: "Certificates", value: String(CERTS.length) },
                { label: "Years Learning", value: String(yearsLearning) },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
                >
                  <p className="text-lg sm:text-xl font-semibold text-zinc-100">{s.value}+</p>
                  <p className="mt-1 text-[11px] sm:text-xs text-zinc-400">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0.28}
              className="mt-7 flex flex-wrap gap-3"
            >
            <Link
              className="rounded-2xl px-4 py-2 text-sm font-semibold bg-gradient-to-r from-sky-400 to-violet-400 text-zinc-950 hover:brightness-110 transition"
              href="/portfolio"
            >
              Buka Portfolio
            </Link>

              <a
                className="rounded-2xl px-4 py-2 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 transition"
                href="/CV-Lia-Purnama-Sari.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Download CV
              </a>

            </motion.div>

{/* Socials */}
<div className="mt-5 flex flex-wrap items-center gap-3">
  <a
    href={PROFILE.waLink}
    target="_blank"
    rel="noreferrer"
    className="social-btn wa"
    aria-label="WhatsApp"
    title="WhatsApp"
  >
    <FaWhatsapp className="social-icon" size={18} />
  </a>

  <a
    href={PROFILE.socials?.instagram}
    target="_blank"
    rel="noreferrer"
    className="social-btn ig"
    aria-label="Instagram"
    title="Instagram"
  >
    <FaInstagram className="social-icon" size={18} />
  </a>

  <a
    href={PROFILE.socials?.facebook}
    target="_blank"
    rel="noreferrer"
    className="social-btn fb"
    aria-label="Facebook"
    title="Facebook"
  >
    <FaFacebook className="social-icon" size={18} />
  </a>

  <a
    href={PROFILE.socials?.tiktok}
    target="_blank"
    rel="noreferrer"
    className="social-btn tt"
    aria-label="TikTok"
    title="TikTok"
  >
    <FaTiktok className="social-icon" size={18} />
  </a>
</div>

          </div>

          {/* Right side: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="flex justify-center"
          >
            <motion.div {...floatAnim} className="relative">
              <div className="absolute -inset-4 rounded-[44px] bg-gradient-to-r from-sky-400/30 to-violet-400/30 blur-2xl" />
              <div className="relative overflow-hidden rounded-[36px] border border-white/12 bg-white/5 p-2">
                <motion.div
                  whileHover={{ rotate: 0.8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="relative overflow-hidden rounded-[30px]"
                >
                <Image
                  src={PROFILE.photoHero}
                  alt={`Foto ${PROFILE.name}`}
                  width={380}
                  height={460}
                  className="h-[320px] w-[280px] sm:h-[380px] sm:w-[340px] object-cover"
                  priority
                />

                  {/* subtle grain overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E)",
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>



{/* ABOUT (Top-tier, compact & clean) */}
<section className="mt-12">
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
    className="glass soft-shadow rounded-3xl overflow-hidden"
  >
    {/* Header */}
    <div className="p-6 sm:p-8 border-b border-white/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            {ABOUT.headline}
          </h2>
          <p className="mt-2 text-zinc-300/90 max-w-2xl">
            {ABOUT.tagline}
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
          About
        </span>
      </div>

      {/* Quick facts (kecil tapi meyakinkan) */}
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
          {PROFILE.location}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
          {PROFILE.campus}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
          Open to internship / freelance
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-6 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Photo card (lebih kecil, premium) */}
        <div className="lg:col-span-4 order-1">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-3">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src={ABOUT.photo}
                alt={`Foto ${PROFILE.name}`}
                width={1000}
                height={1200}
                className="w-full h-[240px] sm:h-[280px] lg:h-[320px] object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/45 via-transparent to-transparent" />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-200">{PROFILE.name}</p>
              <p className="text-xs text-zinc-400">{PROFILE.location}</p>
            </div>
          </div>
        </div>

        {/* Right: Summary + Role cards */}
        <div className="lg:col-span-8 order-2">
          <p className="text-zinc-300/90 leading-relaxed max-w-3xl">
            {ABOUT.summary}
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ABOUT.roles.slice(0, 4).map((r) => (
              <div
                key={r.title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
              >
                <div className="flex items-center gap-4">
                  <span className="grid place-items-center h-11 w-11 rounded-2xl border border-white/10 bg-white/5 text-zinc-100 group-hover:scale-[1.03] transition">
                    {roleIcon(r.icon)}
                  </span>

                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-100 leading-tight">
                      {r.title}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {(r.tags ?? []).slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/portfolio"
              className="rounded-2xl px-4 py-2 text-sm font-semibold bg-gradient-to-r from-sky-400 to-violet-400 text-zinc-950 hover:brightness-110 transition"
            >
              Lihat Projects
            </Link>

            <Link
              href="/gallery"
              className="rounded-2xl px-4 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              Gallery
            </Link>

            <Link
              href="/contact"
              className="rounded-2xl px-4 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
</section>


      
    </div>
  );
}