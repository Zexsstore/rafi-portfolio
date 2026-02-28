import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function esc(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Data belum lengkap." }, { status: 400 });
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json({ error: "Format email tidak valid." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "RESEND_API_KEY belum diset." }, { status: 500 });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    if (!toEmail) {
      return NextResponse.json({ error: "CONTACT_TO_EMAIL belum diset." }, { status: 500 });
    }

    // Optional branding (boleh kamu set di .env.local)
    const brandName = process.env.BRAND_NAME || "Lia Purnama Sari";
    const fromName = process.env.MAIL_FROM_NAME || `${brandName} Website Portfolio`;
    // NOTE: masih pakai onboarding@resend.dev kalau belum verify domain
    const fromEmail = process.env.MAIL_FROM_EMAIL || "onboarding@resend.dev";

    const now = new Date();
    const ts = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(now);

    const safeName = esc(name);
    const safeEmail = esc(email);
    const safeMsg = esc(message).replaceAll("\n", "<br/>");

    const subject = `Pesan baru dari ${name}`;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background:#f6f7fb; padding:24px;">
        <div style="max-width: 640px; margin: 0 auto;">
          
          <div style="padding: 18px 18px 12px;">
            <div style="font-size:12px; letter-spacing:.08em; color:#6b7280; text-transform:uppercase;">
              Contact Form
            </div>
            <div style="font-size:22px; font-weight:700; color:#111827; margin-top:6px;">
              Pesan Masuk
            </div>
            <div style="font-size:13px; color:#6b7280; margin-top:6px;">
              ${esc(ts)}
            </div>
          </div>

          <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:16px; overflow:hidden; box-shadow: 0 10px 30px rgba(17,24,39,.06);">
            
            <div style="padding:18px; border-bottom:1px solid #eef2f7; background: linear-gradient(90deg, #eff6ff, #f5f3ff);">
              <div style="font-size:14px; color:#111827;">
                <strong>${safeName}</strong> mengirim pesan melalui website.
              </div>
            </div>

            <div style="padding:18px;">
              <table style="width:100%; border-collapse:collapse;">
                <tr>
                  <td style="width:120px; font-size:12px; color:#6b7280; padding:8px 0;">Nama</td>
                  <td style="font-size:14px; color:#111827; padding:8px 0;"><strong>${safeName}</strong></td>
                </tr>
                <tr>
                  <td style="width:120px; font-size:12px; color:#6b7280; padding:8px 0;">Email</td>
                  <td style="font-size:14px; color:#111827; padding:8px 0;">
                    <a href="mailto:${safeEmail}" style="color:#2563eb; text-decoration:none;">${safeEmail}</a>
                  </td>
                </tr>
              </table>

              <div style="margin-top:14px; font-size:12px; color:#6b7280;">Pesan</div>
              <div style="margin-top:8px; padding:14px; background:#0b1220; color:#e5e7eb; border-radius:12px; line-height:1.6; font-size:14px;">
                ${safeMsg}
              </div>

              <div style="margin-top:16px; font-size:12px; color:#6b7280;">
                Balas email ini untuk membalas langsung ke pengirim (Reply-To sudah diset).
              </div>
            </div>

            <div style="padding:14px 18px; border-top:1px solid #eef2f7; background:#fafafa; font-size:12px; color:#6b7280;">
              Dikirim oleh <strong style="color:#111827;">${esc(fromName)}</strong>
            </div>
          </div>

          <div style="text-align:center; font-size:11px; color:#9ca3af; margin-top:14px;">
            © ${new Date().getFullYear()} ${esc(brandName)}. All rights reserved.
          </div>

        </div>
      </div>
    `;

    const text = [
      "PESAN MASUK (Contact Form)",
      `Waktu: ${ts}`,
      "",
      `Nama : ${name}`,
      `Email: ${email}`,
      "",
      "Pesan:",
      message,
      "",
      `— ${fromName}`,
    ].join("\n");

    const result = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject,
      html,
      text,
    });

    if ((result as any)?.error) {
      console.error("RESEND ERROR:", (result as any).error);
      return NextResponse.json(
        { error: "Gagal mengirim email (Resend).", detail: (result as any).error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { ok: true, id: (result as any)?.data?.id ?? null },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("API CONTACT ERROR:", err);
    return NextResponse.json(
      { error: "Server error.", detail: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}