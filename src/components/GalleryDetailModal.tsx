"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Calendar, ExternalLink, X } from "lucide-react";

function formatDateID(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

export default function GalleryDetailModal({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: any | null;
}) {

  if (!open || !item) return null;
  
  // ESC close + lock scroll
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      {/* Backdrop */}
      <button
        aria-label="Tutup modal"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 backdrop-blur-xl soft-shadow">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/10">
            <div className="min-w-0">
              <p className="text-xs text-zinc-400">{item.category}</p>
              <h2 className="mt-1 text-lg sm:text-xl font-semibold truncate">
                {item.title}
              </h2>

              <div className="mt-2 inline-flex items-center gap-2 text-xs text-zinc-400">
                <Calendar size={14} />
                <span>{formatDateID(item.date)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* ICON = FULL IMAGE */}
              <a
                href={item.src}
                target="_blank"
                rel="noreferrer"
                className="grid place-items-center h-10 w-10 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                title="Buka gambar full"
              >
                <ExternalLink size={18} />
              </a>

              {/* CLOSE */}
              <button
                onClick={onClose}
                className="grid place-items-center h-10 w-10 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                aria-label="Tutup"
                title="Tutup"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr]">
            {/* Image preview */}
            <div className="p-5 sm:p-6">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <div className="relative h-[52vh] min-h-[340px]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Detail singkat */}
            <div className="p-5 sm:p-6 border-t lg:border-t-0 lg:border-l border-white/10">
              <p className="text-sm text-zinc-300/90 leading-relaxed">
                {item.desc}
              </p>

              {item.location ? (
                <p className="mt-3 text-xs text-zinc-400">
                  Lokasi: <span className="text-zinc-200">{item.location}</span>
                </p>
              ) : null}

              {item.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((t: string) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}