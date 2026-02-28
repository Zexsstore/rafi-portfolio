import "./globals.css";
import type { Metadata } from "next";
import LayoutShell from "@/components/Layout";


export const metadata: Metadata = {
  title: "Lia Purnama Sari Portfolio",
  description:
    "Portfolio Lia Purnama Sari Sistem & Teknologi Informasi, Universitas 17 Agustus 1945 Surabaya.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
<body>
  <LayoutShell>{children}</LayoutShell>
</body>
    </html>
  );
}