"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { GALLERY } from "@/lib/data";
import { Calendar, ExternalLink, Eye } from "lucide-react";
import dynamic from "next/dynamic";

const GalleryDetailModal = dynamic(
  () => import("@/components/GalleryDetailModal"),
  { ssr: false }
);


function formatDateID(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

export default function GalleryPage() {
  const [open, setOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // ✅ taruh DI SINI
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const activeItem = useMemo(
    () => GALLERY.find((x: any) => x.slug === activeSlug) ?? null,
    [activeSlug]
  );

  function closeModal() {
    setOpen(false);
    setActiveSlug(null);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <section className="mt-10 glass soft-shadow rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/10">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Documentation
          </h1>
          <p className="mt-2 text-zinc-400">
            Dokumentasi kegiatan, desain, dan screenshot project.
          </p>
        </div>

        {/* Grid */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GALLERY.map((g) => (
              <div
                  key={g.slug}
                  className="group relative rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden"
                >
                {/* Thumb */}
                <div className="relative">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={g.src}
                      alt={g.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition duration-300"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/55 via-transparent to-transparent" />
                  </div>

                  {/* Category */}
                  <div className="absolute top-3 left-3 rounded-full border border-white/10 bg-zinc-950/55 backdrop-blur px-3 py-1 text-xs text-zinc-200">
                    {g.category}
                  </div>

                  {/* ICON = FULL IMAGE (beda fungsi dari Lihat Detail) */}
                  <a
                    href={g.src}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Buka gambar full"
                    className="absolute top-3 right-3 grid place-items-center h-10 w-10 rounded-2xl border border-white/10 bg-zinc-950/55 backdrop-blur hover:bg-white/10 transition"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-zinc-100">
                    {g.title}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                    {g.desc}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 text-xs text-zinc-400">
                      <Calendar size={14} />
                      <span>{formatDateID(g.date)}</span>
                    </div>

                    {/* Lihat Detail = popup */}
<button
  type="button"
  onClick={() => {
    setActiveSlug(g.slug);
    setOpen(true);
  }}
  className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10 hover:border-white/20 transition relative z-10"
>
  <Eye size={16} className="opacity-80" />
  Detail
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

{/* Popup modal (render hanya saat aman) */}
{mounted && open && activeItem ? (
  <GalleryDetailModal open={open} onClose={closeModal} item={activeItem} />
) : null}
</div>

  );
}