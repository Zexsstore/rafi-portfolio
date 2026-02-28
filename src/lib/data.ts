  export const PROFILE = {
    name: "Lia Purnama Sari",
    role: "Mahasiswa Sistem & Teknologi Informasi",
    campus: "Universitas 17 Agustus 1945 Surabaya",
    location: "Surabaya, Indonesia",
    whatsapp: "+6285648185206",
    waLink: "https://wa.me/6285648185206",
    email: "liapurnama2307@gmail.com", // ganti nanti
    photoHero: "/profile1.jpg",
    photoNav: "/avatar.jpeg",
    socials: {
      instagram: "https://instagram.com/lia_purnama23",
      facebook: "https://facebook.com/liacastello",
      tiktok: "https://tiktok.com/@lily_moonlight",
    },
      };

  export const ABOUT = {
    headline: "Tentang Saya",
    tagline: "Web & UI Designer yang fokus pada desain rapi, responsif, dan user-friendly.",
    summary:
    "Saya mahasiswa Sistem & Teknologi Informasi yang fokus pada desain UI rapi dan web responsif. Saya terbiasa membuat konten visual di Canva serta mengembangkan tampilan web yang mudah dipahami.",
    roles: [
      { title: "Web Developer (Frontend)", tags: ["Next.js", "Tailwind"], icon: "code" },
      { title: "UI/UX & Visual Designer", tags: ["UI Layout", "Typography"], icon: "palette" },
      { title: "Canva Designer", tags: ["Canva", "Branding"], icon: "sparkles" },
      { title: "AI Content & Creative", tags: ["Copywriting", "Content Plan"], icon: "wand" },
    ],
        photo: "/about.jpeg",
      };


    export const NAV = [
      { label: "Home", href: "/" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
    ];

  export const SKILLS = {
    languages: [
      { name: "Python", level: "Beginner" },
      { name: "JavaScript", level: "Beginner" },
      { name: "HTML", level: "Beginner" },
      { name: "CSS", level: "Beginner" },
    ],
    tools: [
      "VS Code",
      "Git & GitHub",
      "Google Colab",
      "Canva",
      "Windows",
    ],
    interests: ["Web Development", "Basic Programming", "Operating Systems"],
  };

export const PROJECTS = [
  {
    slug: "budget-planner",
    title: "Budget Planner (Infografis Keuangan)",
    desc: "Infografis alokasi anggaran Rp1.500.000 dengan metode 50/30/20, lengkap tabel dan visual ringkas.",
    tags: ["Canva", "Infographic", "Budgeting"],
    image: "/projects/budget.png",
    links: {
      demo: "/projects/budget.png", // klik buka full gambar (sementara)
      repo: "#",
    },
  },
];


export const TECH_STACK = {
  languages: [
    { name: "Python", icon: "python" },
    { name: "JavaScript", icon: "js" },
    { name: "HTML", icon: "html" },
    { name: "CSS", icon: "css" },
  ],
  frameworks: [
    { name: "Next.js", icon: "next" },
    { name: "React", icon: "react" },
    { name: "Tailwind", icon: "tailwind" },
  ],
  tools: [
    { name: "VS Code", icon: "vscode" },
    { name: "GitHub", icon: "github" },
    { name: "Canva", icon: "canva" },
    { name: "CapCut", icon: "capcut" },
    { name: "Figma", icon: "figma" },
  ],
};


  export const CERTS = [
    {
      id: "magang-multimedia-2024",
      title: "Sertifikat Magang (Multimedia)",
      org: "MAPK Wachid Hasyim Surabaya",
      location: "Surabaya, Indonesia",
      date: "2024-05-13", // format rapi untuk sorting
      year: "2024",
      duration: "6 bulan",
      image: "/certs/sertifikat-magang-multimedia-2024.jpeg",
      link: "/certs/sertifikat-magang-multimedia-2024.jpeg", // klik buka full
      skills: ["Multimedia", "Desain Konten", "Editing"],
      note: "Data sensitif disensor pada preview.",
    },
  ];

export const GALLERY = [
  {
    slug: "intechtion-2025",
    title: "Intechtion 2025",
    desc:
      "Dokumentasi awal masa perkuliahan di Universitas 17 Agustus 1945 Surabaya. Kegiatan Intechtion 2025 ini jadi bagian dari rangkaian penyambutan mahasiswa baru (PKKMB).",
    date: "2025-09-15",
    category: "Documentation",
    location: "Surabaya",
    tags: ["Event", "Twibbon", "Campus"],
    src: "/gallery/intechtion-2025.jpeg",
  },
];