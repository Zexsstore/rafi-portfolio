"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS, CERTS, TECH_STACK } from "@/lib/data";
import { SiCanva } from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { FaVideo } from "react-icons/fa";
import {
  FolderKanban,
  Award,
  Boxes,
  ExternalLink,
  ArrowRight,
  Code2,
  Palette,
  PenTool,
  Video,
} from "lucide-react";

const techIcon = (key: string) => {
  const cls = "h-4 w-4";
  switch (key) {
    case "python":
    case "js":
    case "html":
      return <Code2 className={cls} />;
    case "css":
    case "canva":
      return <Palette className={cls} />;
    case "next":
    case "react":
    case "tailwind":
    case "github":
      return <Boxes className={cls} />;
    case "vscode":
    case "figma":
      return <PenTool className={cls} />;
    case "capcut":
      return <Video className={cls} />;
    default:
      return <Boxes className={cls} />;
  }
};

const deviconClass = (key: string) => {
  switch (key) {
    case "html":
      return "devicon-html5-plain colored";
    case "css":
      return "devicon-css3-plain colored";
    case "js":
      return "devicon-javascript-plain colored";
    case "python":
      return "devicon-python-plain colored";
    case "react":
      return "devicon-react-original colored";
    case "next":
      return "devicon-nextjs-plain"; // putih
    case "tailwind":
      return "devicon-tailwindcss-original colored";
    case "github":
      return "devicon-github-original"; // putih
    case "figma":
      return "devicon-figma-plain colored";
    default:
      return "devicon-devicon-plain";
  }
};

export default function PortfolioPage() {
  const [tab, setTab] = useState<"projects" | "certs" | "stack">("projects");

  // optional: hitung total
  const totals = useMemo(
    () => ({
      projects: PROJECTS.length,
      certs: CERTS.length,
      stack:
        TECH_STACK.languages.length +
        TECH_STACK.frameworks.length +
        TECH_STACK.tools.length,
    }),
    []
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <section className="mt-10 glass soft-shadow rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Portfolio
              </h1>
              <p className="mt-2 text-zinc-400">
                 Proyek, sertifikat, dan aplikasi yang saya gunakan.
              </p>
            </div>

            <div className="hidden sm:flex gap-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm">
                <span className="text-zinc-400">Projects</span>{" "}
                <span className="text-zinc-100 font-semibold">{totals.projects}</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm">
                <span className="text-zinc-400">Certs</span>{" "}
                <span className="text-zinc-100 font-semibold">{totals.certs}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 sm:px-8 pt-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setTab("projects")}
              className={`whitespace-nowrap rounded-2xl px-4 py-2 text-sm border transition ${
                tab === "projects"
                  ? "bg-white/10 border-white/15 text-white"
                  : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <FolderKanban size={16} />
                Projects
              </span>
            </button>

            <button
              onClick={() => setTab("certs")}
              className={`whitespace-nowrap rounded-2xl px-4 py-2 text-sm border transition ${
                tab === "certs"
                  ? "bg-white/10 border-white/15 text-white"
                  : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Award size={16} />
                Certificates
              </span>
            </button>

            <button
              onClick={() => setTab("stack")}
              className={`whitespace-nowrap rounded-2xl px-4 py-2 text-sm border transition ${
                tab === "stack"
                  ? "bg-white/10 border-white/15 text-white"
                  : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Boxes size={16} />
                Tech Stack
              </span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 pt-5">

          {/* Projects */}
{tab === "projects" && (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
    {PROJECTS.map((p) => (
      <motion.div
        key={p.slug}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
      >
        {/* Preview Image */}
        {p.image ? (
          <div className="relative mb-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <Image
              src={p.image}
              alt={p.title}
              width={1200}
              height={800}
              className="h-44 w-full object-cover"
            />
          </div>
        ) : null}

        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold">{p.title}</h3>

          {/* icon kecil kanan */}
          {p.links?.demo && p.links.demo !== "#" ? (
            <a
              href={p.links.demo}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 hover:text-white"
              title="Lihat"
            >
              <ExternalLink size={16} />
            </a>
          ) : null}
        </div>

        <p className="mt-2 text-sm text-zinc-400">{p.desc}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Tombol gaya “kelas atas” (seperti sertifikat) */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <a
            href={p.links?.demo ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              rounded-2xl px-4 py-2 text-sm font-semibold
              border border-white/10 bg-white/5
              text-zinc-100
              hover:bg-white/10 hover:border-white/20
              hover:shadow-[0_10px_30px_rgba(56,189,248,0.10)]
              transition
              focus:outline-none focus:ring-2 focus:ring-sky-400/50
              w-full sm:w-auto
            "
          >
            Lihat Project
            <ArrowRight size={16} className="opacity-80" />
          </a>

          <span className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
            2026
          </span>
        </div>
      </motion.div>
    ))}
  </div>
)}

{/* Certificates */}
{tab === "certs" && (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
    {CERTS.map((c) => (
      <motion.div
        key={c.title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
      >
        {/* Preview image */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <Image
            src={c.image}
            alt={c.title}
            width={1200}
            height={800}
            className="h-44 w-full object-cover"
          />
        </div>

        {/* Title + meta */}
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold truncate">{c.title}</h3>

            {/* HILANGKAN TITIK: pakai " • " bukan "," */}
            <p className="mt-1 text-sm text-zinc-400">
              {c.org}, {c.year}
            </p>
          </div>

          <Award size={16} className="text-zinc-300 shrink-0" />
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <a
            href={c.link || c.image}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              rounded-2xl px-4 py-2 text-sm font-semibold
              border border-white/10 bg-white/5
              text-zinc-100
              hover:bg-white/10 hover:border-white/20
              hover:shadow-[0_10px_30px_rgba(56,189,248,0.10)]
              transition
              focus:outline-none focus:ring-2 focus:ring-sky-400/50
              w-full sm:w-auto
            "
          >
            Lihat Sertifikat
            <ExternalLink size={16} className="opacity-80" />
          </a>

          {/* Badge kanan */}
          <span className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
            {c.year}
          </span>
        </div>
      </motion.div>
    ))}
  </div>
)}

          {/* Tech Stack */}
          {tab === "stack" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {[
                { title: "Languages", items: TECH_STACK.languages },
                { title: "Frameworks", items: TECH_STACK.frameworks },
                { title: "Tools", items: TECH_STACK.tools },
              ].map((group) => (
                <div
                  key={group.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="font-semibold">{group.title}</h3>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {group.items.map((it: any) => (
                      <div
                        key={it.name}
                        className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
                      >
                    <span
                      className={[
                        "grid place-items-center h-9 w-9 rounded-xl border bg-white/5 transition",
                        "border-white/10 hover:bg-white/10",
                        it.icon === "canva"
                          ? "bg-[#00C4CC]/15 border-[#00C4CC]/25 hover:bg-[#00C4CC]/20"
                          : "",
                        it.icon === "capcut"
                          ? "bg-white/8 border-white/15 hover:bg-white/12"
                          : "",
                        it.icon === "vscode"
                          ? "bg-[#0078D4]/15 border-[#0078D4]/25 hover:bg-[#0078D4]/20"
                          : "",
                      ].join(" ")}
                    >
                      {it.icon === "canva" ? (
                        <SiCanva size={20} color="#00C4CC" />
                      ) : it.icon === "capcut" ? (
                        <FaVideo size={18} className="text-zinc-200" />
                      ) : it.icon === "vscode" ? (
                        <TbBrandVscode size={20} color="#0078D4" />
                      ) : (
                        <i
                          className={[
                            `${deviconClass(it.icon)} text-2xl`,
                            it.icon === "next" || it.icon === "github" ? "text-white" : "",
                          ].join(" ")}
                        />
                      )}
                    </span>
                        <span className="text-sm text-zinc-200">{it.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <Link
              href="/contact"
              className="rounded-2xl px-4 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              Hubungi Saya
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}