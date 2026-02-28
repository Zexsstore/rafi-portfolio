"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FadeIn, Button, Card, Container, SectionTitle } from "./ui";
import { CERTS, PROFILE, PROJECTS, SKILLS } from "@/lib/data";
import Link from "next/link";


function WaveHeader() {
  return (
    <div className="relative overflow-hidden rounded-[32px] glass soft-shadow">
      {/* Glow blobs supaya header tidak polos */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-sky-400/25 blur-3xl" />
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      {/* Wave shape */}
      <svg className="absolute -bottom-1 left-0 w-full opacity-40" viewBox="0 0 1440 220" preserveAspectRatio="none">
        <path
          d="M0,128L60,112C120,96,240,64,360,69.3C480,75,600,117,720,128C840,139,960,117,1080,90.7C1200,64,1320,32,1380,16L1440,0L1440,220L0,220Z"
          fill="rgba(255,255,255,0.12)"
        />
      </svg>

      <div className="relative p-6 sm:p-10">
        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-center lg:justify-between">
          <FadeIn
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-2xl"
          >
            <p className="text-muted">Halo, saya</p>
            <h1 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight">{PROFILE.name}</h1>
            <p className="mt-4 text-muted text-base sm:text-lg">
              {PROFILE.role} • {PROFILE.campus}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary" href="#projects">Lihat Project</Button>
              <Button href={PROFILE.waLink}>Chat WhatsApp</Button>
              <Button href="#contact">Kontak</Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Responsif", "Elegan", "Animasi halus", "Full-stack Contact"].map((x) => (
                <span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                  {x}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Foto + animasi */}
          <FadeIn
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-[36px] bg-gradient-to-r from-sky-400/35 to-violet-400/35 blur-2xl" />
              <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-2">
                <Image
                  src={PROFILE.photoHero}
                  alt="Foto Rafi (dummy)"
                  width={360}
                  height={420}
                  className="h-[320px] w-[280px] sm:h-[380px] sm:w-[340px] object-cover rounded-[30px]"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

export function Top() {
  return (
    <Container>
      <div className="mt-8">
        <WaveHeader />
      </div>
    </Container>
  );
}

export function AboutSkills() {
  return (
    <Container>
      <div id="about" className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <FadeIn
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <SectionTitle title="Tentang Saya" desc="Ringkas, jelas, dan enak dibaca." />
            <p className="text-muted">
              Saya mahasiswa Sistem dan Teknologi Informasi di Universitas 17 Agustus 1945 Surabaya.
              Saya sedang membangun portofolio untuk menampilkan proyek, sertifikat, dan perkembangan skill.
            </p>
          </Card>
        </FadeIn>

        <FadeIn
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <Card id="skills">
            <SectionTitle title="Skill" desc="Mulai sedikit dulu, nanti tambah." />
            <div className="flex flex-wrap gap-2">
{(Array.isArray(SKILLS) ? SKILLS : [...(SKILLS.languages ?? []), ...(SKILLS.tools ?? [])]).map((s: any) => (
  <span key={typeof s === "string" ? s : s.name} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
    {typeof s === "string" ? s : s.name}
  </span>
))}
            </div>
          </Card>
        </FadeIn>
      </div>
    </Container>
  );
}

export function Projects() {
  return (
    <Container>
      <div id="projects" className="mt-10">
        <SectionTitle title="Projects" desc="Taruh 3–6 project terbaik (tugas kuliah juga boleh)." />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <FadeIn
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Card>
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
                
<div className="mt-5">
  <Link
    href={`/portfolio/${p.slug}`}
    className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 transition"
  >
    Lihat Detail
  </Link>
</div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </Container>
  );
}

export function Certificates() {
  return (
    <Container>
      <div id="certs" className="mt-10">
        <SectionTitle title="Sertifikat" desc="Upload PDF/JPG lalu tempel link." />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {CERTS.map((c, i) => (
            <FadeIn
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Card>
                <h3 className="text-base font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted">{c.org} • {c.year}</p>
                <div className="mt-5">
                  <Button href={c.link}>Lihat Sertifikat</Button>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </Container>
  );
}

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [msgType, setMsgType] = useState<"ok" | "err" | null>(null);

  // ✅ active pill: "wa" / "email"
  const [active, setActive] = useState<"wa" | "email">("wa");

  const maskedPhone = useMemo(() => {
    return PROFILE.whatsapp.replace(
      /^(\+62)(\d{3})(\d{4})(\d+)/,
      "$1 $2-$3-xxxx"
    );
  }, []);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent("Halo Rafi — dari Portfolio");
    const body = encodeURIComponent("Halo Rafi,\n\nSaya ingin bertanya tentang...\n");
    return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setMsgType(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      message: String(fd.get("message") || "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsgType("err");
        setMsg(json?.error ?? "Gagal mengirim. Coba lagi.");
        return;
      }

      (e.target as HTMLFormElement).reset();
      setMsgType("ok");
      setMsg("Terkirim! Terima kasih 🙌");
    } catch {
      setMsgType("err");
      setMsg("Koneksi bermasalah. Coba lagi ya.");
    } finally {
      setLoading(false);
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setMsgType("ok");
      setMsg("Email disalin ✔");
      setTimeout(() => {
        setMsg(null);
        setMsgType(null);
      }, 1500);
    } catch {
      setMsgType("err");
      setMsg("Gagal menyalin email.");
    }
  }

  return (
    <Container>
      <div id="contact" className="mt-10">
        <SectionTitle title="Contact" desc="Kirim pesan atau hubungi saya via WhatsApp / Email." />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* INFO */}
          <Card>
            <h3 className="text-base font-semibold">Info</h3>

            <p className="mt-2 text-sm text-muted">
              Lokasi: <span className="text-zinc-200">{PROFILE.location ?? "Surabaya, Indonesia"}</span>
            </p>

            <p className="mt-2 text-sm text-muted">
              WhatsApp: <span className="text-zinc-200">{maskedPhone}</span>
            </p>

            <p className="mt-2 text-sm text-muted">
              Email: <span className="text-zinc-200">{PROFILE.email}</span>
            </p>

            {/* ✅ PILLS (Chat WhatsApp / Email) with sliding indicator */}
            <div className="mt-5">
              <div
                className="
                  relative flex items-center gap-1
                  rounded-full border border-white/10 bg-white/5 p-1
                  shadow-[0_12px_35px_rgba(0,0,0,0.30)]
                  w-full max-w-sm
                "
                role="tablist"
                aria-label="Pilih metode kontak"
              >
                {/* sliding indicator */}
                <span
                  className={[
                    "absolute top-1 bottom-1 left-1",
                    "w-[calc(50%-0.25rem)] rounded-full",
                    "bg-gradient-to-r from-sky-400 to-violet-400",
                    "shadow-[0_10px_28px_rgba(56,189,248,0.18)]",
                    "transition-transform duration-300 ease-out",
                    active === "email" ? "translate-x-full" : "translate-x-0",
                  ].join(" ")}
                />

                <button
                  type="button"
                  role="tab"
                  aria-selected={active === "wa"}
                  onClick={() => setActive("wa")}
                  className={[
                    "relative z-10 flex-1 rounded-full px-4 py-2 text-sm font-semibold",
                    "transition",
                    active === "wa"
                      ? "text-zinc-950"
                      : "text-zinc-200 hover:text-white",
                  ].join(" ")}
                >
                  Chat WhatsApp
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={active === "email"}
                  onClick={() => setActive("email")}
                  className={[
                    "relative z-10 flex-1 rounded-full px-4 py-2 text-sm font-semibold",
                    "transition",
                    active === "email"
                      ? "text-zinc-950"
                      : "text-zinc-200 hover:text-white",
                  ].join(" ")}
                >
                  Email
                </button>
              </div>

              {/* ✅ content changes following active pill */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                {active === "wa" ? (
                  <>
                    <p className="text-sm text-zinc-300">
                      Respon paling cepat lewat WhatsApp.
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <a
                        href={PROFILE.waLink}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          inline-flex items-center justify-center gap-2
                          rounded-2xl px-4 py-3 text-sm font-semibold
                          bg-emerald-400/15 text-emerald-200 border border-emerald-400/25
                          hover:bg-emerald-400/25 hover:border-emerald-400/40
                          active:scale-[0.98]
                          transition
                        "
                      >
                        💬 Buka WhatsApp →
                      </a>

                      <span className="text-xs text-zinc-400">
                        Nomor: <span className="text-zinc-200">{maskedPhone}</span>
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-zinc-400">
                      Tips: kalau urgent, gunakan WhatsApp.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-zinc-300">
                      Cocok untuk pesan formal (kerja sama / CV / proposal).
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <a
                        href={mailto}
                        className="
                          inline-flex items-center justify-center gap-2
                          rounded-2xl px-4 py-3 text-sm font-semibold
                          bg-sky-400/15 text-sky-200 border border-sky-400/25
                          hover:bg-sky-400/25 hover:border-sky-400/40
                          active:scale-[0.98]
                          transition
                        "
                      >
                        ✉️ Tulis Email →
                      </a>

                      <button
                        type="button"
                        onClick={copyEmail}
                        className="
                          inline-flex items-center justify-center gap-2
                          rounded-2xl px-4 py-3 text-sm font-semibold
                          border border-white/10 bg-white/5 text-zinc-200
                          hover:bg-white/10 hover:border-white/20
                          active:scale-[0.98]
                          transition
                        "
                      >
                        📋 Copy Email
                      </button>

                      <span className="text-xs text-zinc-400">
                        {PROFILE.email}
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-zinc-400">
                      Tips: email cocok untuk detail panjang.
                    </p>
                  </>
                )}

                {msg ? (
                  <div
                    className={[
                      "mt-4 rounded-2xl border px-4 py-3 text-sm",
                      msgType === "ok"
                        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                        : "border-rose-400/20 bg-rose-400/10 text-rose-200",
                    ].join(" ")}
                  >
                    {msg}
                  </div>
                ) : null}
              </div>
            </div>
          </Card>

          {/* FORM */}
          <Card>
            <h3 className="text-base font-semibold">Kirim Pesan</h3>
            <p className="mt-2 text-sm text-muted">
              Isi form ini, nanti pesan diproses oleh server.
            </p>

            <form className="mt-4 space-y-3" onSubmit={onSubmit}>
              <input
                name="name"
                required
                placeholder="Nama"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none
                           focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20 transition"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none
                           focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20 transition"
              />
              <textarea
                name="message"
                required
                placeholder="Pesan"
                rows={5}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none
                           focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20 transition"
              />

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-2xl px-5 py-3 text-sm font-semibold
                    bg-gradient-to-r from-sky-400 to-violet-400 text-zinc-950
                    hover:brightness-110 active:brightness-95
                    disabled:opacity-60 disabled:cursor-not-allowed
                    transition
                  "
                >
                  {loading ? "Mengirim..." : "Kirim"}
                </button>

                <span className="text-xs text-zinc-400">
                  Butuh cepat? pilih <b>Chat WhatsApp</b> di kiri.
                </span>
              </div>
            </form>
          </Card>
        </div>

        <p className="mt-10 text-center text-xs text-muted">
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
      </div>
    </Container>
  );
}