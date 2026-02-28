"use client";

import { useMemo, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";

type Method = "form" | "whatsapp" | "email";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [method, setMethod] = useState<Method>("form");

  const nameRef = useRef<HTMLInputElement | null>(null);
  const msgRef = useRef<HTMLTextAreaElement | null>(null);

  const maskedPhone = useMemo(() => {
    const raw = String(PROFILE.whatsapp || "");
    return raw.replace(/^(\+62)(\d{3})(\d{4})(\d+)/, "$1 $2-$3-xxxx");
  }, []);

  const waHref = useMemo(() => {
    const msg = encodeURIComponent("Halo, saya melihat portfolio kamu. Saya ingin bertanya...");
    if (PROFILE.waLink) return `${PROFILE.waLink}?text=${msg}`;
    return `https://wa.me/${String(PROFILE.whatsapp).replace(/\D/g, "")}?text=${msg}`;
  }, []);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Halo Rafi — dari Portfolio");
    const body = encodeURIComponent("Halo Rafi,\n\nSaya ingin bertanya tentang...\n\nTerima kasih.\n");
    return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  }, []);

  function flash(text: string, type: "ok" | "err" = "ok", ms = 1800) {
    setNotice({ type, text });
    window.setTimeout(() => setNotice(null), ms);
  }

  function focusNameSoon() {
    window.setTimeout(() => nameRef.current?.focus(), 80);
  }

  function chooseEmail() {
    setMethod("email");
    flash("Metode dipilih: Email. Silakan isi form di kanan lalu klik Kirim Pesan.");
    focusNameSoon(); // ✅ fokus ke NAMA (bukan email)
  }

  function chooseWhatsApp() {
    setMethod("whatsapp");
    flash("Metode dipilih: WhatsApp. Klik Chat WhatsApp untuk respon tercepat.");
  }

  function chooseForm() {
    setMethod("form");
    flash("Metode dipilih: Contact form. Silakan isi form di kanan.");
    window.setTimeout(() => msgRef.current?.focus(), 80);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      flash("Alamat email disalin.");
    } catch {
      flash("Gagal menyalin email.", "err");
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice(null);
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
        setNotice({ type: "err", text: json?.error ?? "Gagal mengirim. Coba lagi." });
        return;
      }

      (e.target as HTMLFormElement).reset();
      setMethod("form");
      setNotice({ type: "ok", text: "Terkirim. Terima kasih, pesannya sudah masuk ke email saya." });
      focusNameSoon();
    } catch {
      setNotice({ type: "err", text: "Koneksi bermasalah. Coba lagi." });
    } finally {
      setLoading(false);
    }
  }

  const methodLabel =
    method === "email" ? "Email" : method === "whatsapp" ? "WhatsApp" : "Contact Form";

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-10">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <p className="mt-2 text-zinc-400">
        Pilih cara tercepat untuk menghubungi saya, atau kirim pesan lewat form.
      </p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* INFO */}
        <section className="glass soft-shadow rounded-3xl p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Info</h2>
              <p className="mt-2 text-sm text-zinc-400">
                {PROFILE.location ?? "Surabaya, Indonesia"}
              </p>
            </div>

            <div className="hidden sm:inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">
              Metode: <span className="ml-1 text-zinc-100 font-medium">{methodLabel}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-zinc-400">WhatsApp</span>
              <span className="text-zinc-200">{maskedPhone}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-zinc-400">Email</span>
              <span className="text-zinc-200">{PROFILE.email}</span>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              onClick={chooseWhatsApp}
              className={["btn btn-soft", method === "whatsapp" ? "btn-selected" : ""].join(" ")}
            >
              Chat WhatsApp
              <span className="btn-sub">Respon paling cepat</span>
            </a>

            <a
              href={mailtoHref}
              onClick={chooseEmail}
              className={["btn btn-soft", method === "email" ? "btn-selected" : ""].join(" ")}
            >
              Kirim Email
              <span className="btn-sub">Untuk pesan formal</span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="btn btn-ghost sm:col-span-2"
            >
              Copy Alamat Email
              <span className="btn-sub">Klik untuk menyalin</span>
            </button>

          </div>

          {notice ? (
            <div
              className={[
                "mt-5 rounded-2xl border px-4 py-3 text-sm",
                notice.type === "ok"
                  ? "border-sky-400/20 bg-sky-400/10 text-zinc-100"
                  : "border-rose-400/20 bg-rose-400/10 text-rose-100",
              ].join(" ")}
            >
              {notice.text}
            </div>
          ) : null}
        </section>

        {/* FORM */}
        <section className="glass soft-shadow rounded-3xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Kirim Pesan</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Isi form dibawah ini dengan benar, jangan lupa klik tombol Kirim Pesan !
          </p>

          <div className="sm:hidden mt-4 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">
            Metode: <span className="ml-1 text-zinc-100 font-medium">{methodLabel}</span>
          </div>

          <form className="mt-6 space-y-3" onSubmit={onSubmit}>
            <input
              ref={nameRef}
              name="name"
              required
              placeholder="Nama"
              className="field"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="field"
            />
            <textarea
              ref={msgRef}
              name="message"
              required
              placeholder="Pesan"
              rows={6}
              className="field"
            />

            {/* tombol dibuat lebih kecil + rapi */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-primary-compact"
              >
                {loading ? "Mengirim..." : "Kirim Pesan"}
              </button>

              {/* teks dipindah ke bawah tombol */}
              <p className="mt-3 text-xs text-zinc-400">
                Jika ingin cepat terjawab, pilih tombol <b>Chat WhatsApp</b>.
              </p>
            </div>
          </form>
        </section>
      </div>

    </div>
  );
}