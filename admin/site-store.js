/* ============================================================
   Site Content Store — everything on the home page that's
   editable from the CMS lives here. Schema is flat-ish per
   section; the admin renders form controls for each leaf.
   Supports both English (en) and Indonesian (id).

   Key: hw_site_v1
   ============================================================ */
(function (global) {
  'use strict';
  const KEY = 'hw_site_v1';

  const DEFAULT_EN = {
    header: {
      cvPath: 'cv/Hasan-Waulat-CV.pdf',
      waNumber: '6285254308418',
      waMessage: 'Halo Hasan, saya tertarik bekerja sama',
      brandName: 'Hasan Waulat',
      brandTitle: 'UI/UX Designer',
      brandInitial: 'h'
    },
    hero: {
      eyebrow: 'Available for projects · Q2 2026',
      headlineLines: [
        'I design digital products',
        'that move <em>metrics</em> —',
        'not just <em>hearts</em>.'
      ],
      sub: 'UI/UX Designer with <strong>32 shipped products</strong> across fintech, logistics, government, and HR-tech. I help teams ship interfaces that users actually finish — and businesses that actually grow.',
      ctaPrimary: 'See selected work',
      ctaPrimaryHref: '#work',
      ctaSecondaryText: 'All Projects',
      ctaSecondaryHref: 'projects/index.html',
      ctaTertiaryText: 'Book a 30-min intro call',
      ctaTertiaryHref: '#contact',
      trust: ['LPPOM MUI', 'Kementerian Keuangan', 'Ragdalion', 'Binar Academy', 'Eduwork'],
      nowBadge: 'Currently designing — LPPOM Digital Platform',
      photo: 'assets/profile.png',
      scrollCue: "Scroll — there's proof below"
    },
    metrics: [
      { value: 2, suffix: '+ yrs', label: 'in product design' },
      { value: 32, suffix: '', label: 'projects shipped across 4 industries' },
      { value: 15, suffix: '', label: 'satisfied clients across SE Asia' }
    ],
    about: {
      eyebrow: 'About',
      headline: 'I bridge user needs and business goals — <em>without making it look hard.</em>',
      paragraphs: [
        "Hi, I'm <strong>Hasan</strong>. I started designing in 2022 through Binar Academy's independent study program, and over the next two and a half years I've shipped <strong>32 real products</strong> — from a halal certification platform used by thousands of Indonesian businesses, to internal HR tools, to government legal-information apps.",
        "What I'm not is a designer who hands over Figma files and disappears. I sit with engineers, ask product managers the awkward questions, run usability tests when timelines say \"just ship it,\" and obsess over the developer-handoff doc as much as the visual polish. The goal isn't pretty screens — it's products that work for the people using them and the teams building them.",
        "Right now I'm based in <strong>East Jakarta</strong>, working on enterprise-grade mobile and web platforms — and I'm open to remote work globally."
      ],
      ctaText: 'Want the full story? Download my CV →',
      nowCard: [
        { k: 'Designing', v: 'LPPOM Digital Platform — <em>mobile, web admin, iPad</em>' },
        { k: 'Reading', v: 'Refactoring UI by Adam Wathan & Steve Schoger' },
        { k: 'Learning', v: 'Motion design with <em>Lottie & Rive</em>' },
        { k: 'Based in', v: 'East Jakarta · open to remote' },
        { k: 'Reply in', v: 'Under 24 hours' }
      ]
    },
    customers: [
      { initial: 'L', name: 'LPPOM MUI' },
      { initial: 'K', name: 'Kementerian Keuangan' },
      { initial: 'R', name: 'Ragdalion' },
      { initial: 'B', name: 'Binar Academy' },
      { initial: 'E', name: 'Eduwork' },
      { initial: 'D', name: 'Digimarly' },
      { initial: 'A', name: 'Azura Labs' },
      { initial: 'J', name: 'JDIH Kemenkeu' }
    ],
    skills: {
      eyebrow: 'Skills & capabilities',
      headline: 'More than a designer — I drive products from <em>brief to go-live.</em>',
      desc: "Most teams hire a designer and then scramble to fill the gaps — who writes the requirements, who manages the sprint, who keeps everyone aligned post-launch? I cover that whole arc. One person, three hats, zero translation loss.",
      pillars: [
        {
          role: 'Role 01 · Designer',
          title: 'The <em>craft</em> — interfaces that ship and stick.',
          desc: 'End-to-end product design from research to handoff. The visible work — but only the surface of what I do.',
          items: ['User research, interviews & usability testing', 'Information architecture & user flows', 'Wireframes, hi-fi UI, interactive prototypes', 'Design systems & component libraries', 'Mobile, web, iPad — multi-surface design', 'Motion specs & developer handoff docs'],
          stack: ['Figma', 'Framer', 'Maze', 'Tokens Studio', 'Lottie']
        },
        {
          role: 'Role 02 · Business Analyst',
          title: 'The <em>translator</em> — turning fuzzy briefs into shippable specs.',
          desc: 'I sit between stakeholders and engineering, write the requirements doc, and make sure what gets built is what was actually needed.',
          items: ['Stakeholder & requirement elicitation', 'Business process mapping (BPMN, swimlanes)', 'Functional & non-functional requirements (FRD/PRD)', 'Use-case writing & user-story breakdown', 'Gap analysis & competitor benchmarking', 'Acceptance criteria & UAT scenarios'],
          stack: ['Notion', 'Confluence', 'Whimsical', 'Miro', 'Lucidchart']
        },
        {
          role: 'Role 03 · Project Driver',
          title: 'The <em>conductor</em> — kickoff to go-live, no dropped batons.',
          desc: 'I own the project arc end-to-end: scope, schedule, sprint cadence, QA, launch — keeping design, engineering, and stakeholders in sync.',
          items: ['Project scoping & timeline planning', 'Sprint planning & agile ceremonies', 'Cross-functional team coordination', 'QA review & UAT facilitation', 'Release planning & go-live readiness', 'Post-launch monitoring & iteration cycles'],
          stack: ['Jira', 'ClickUp', 'Trello', 'Slack', 'Linear']
        }
      ],
      e2e: [
        { n: '01', label: 'Brief', role: 'BA' },
        { n: '02', label: 'Requirements', role: 'BA' },
        { n: '03', label: 'Design', role: 'Designer' },
        { n: '04', label: 'Build', role: 'PM · Designer' },
        { n: '05', label: 'QA & UAT', role: 'PM · BA' },
        { n: '06', label: 'Go-Live', role: 'PM' }
      ]
    },
    services: {
      eyebrow: 'Services',
      headline: "Three things I'll do <em>for your team.</em>",
      cards: [
        {
          num: '01',
          title: 'Find the real problem before designing the solution.',
          desc: "I run user interviews, usability testing, and competitive teardowns to make sure we're building the right thing — not just the thing that was easiest to spec.",
          items: ['Stakeholder interviews & user research', 'Persona & journey mapping', 'Usability testing — Maze, in-person, remote', 'Insight reports your PM will actually read'],
          tools: 'Maze · Notion · Whimsical'
        },
        {
          num: '02',
          title: 'Designs that earn their place in the sprint.',
          desc: 'From low-fi wireframes to interactive prototypes, I design interfaces that survive contact with real users — and ship without surprises in QA.',
          items: ['Wireframes & interactive prototypes', 'High-fidelity UI for mobile, web & iPad', 'Motion specs for engineering handoff', 'Accessibility-conscious layouts (WCAG-aware)'],
          tools: 'Figma · Framer'
        },
        {
          num: '03',
          title: 'Systems that scale beyond the first sprint.',
          desc: 'I build design systems engineers can actually consume — tokenized, documented, and aligned with your codebase. No more "12 or 14?" arguments in PR review.',
          items: ['Design tokens — colors, type, spacing, motion', 'Component libraries with variants & states', 'Developer-ready handoff documentation', 'Living style guide your team can extend'],
          tools: 'Figma · Tokens Studio · Storybook'
        }
      ]
    },
    process: {
      eyebrow: 'How I work',
      headline: 'No mysteries. Just a clear process from <em>kickoff</em> to <em>handoff.</em>',
      steps: [
        { n: '01', week: 'Week 1', title: 'Discover', desc: 'Stakeholder interviews, user research, competitive analysis. Goal: understand the real problem.' },
        { n: '02', week: 'Week 1–2', title: 'Define', desc: 'Synthesize findings into clear product objectives, user flows, and success criteria.' },
        { n: '03', week: 'Week 2–4', title: 'Design', desc: 'Wireframes → high-fidelity → interactive prototypes. Tight feedback loops every 2-3 days.' },
        { n: '04', week: 'Week 4–5', title: 'Validate', desc: 'Usability testing with 5+ users via Maze or moderated sessions. Iterate on real evidence.' },
        { n: '05', week: 'Week 5+', title: 'Handoff', desc: 'Tokenized design system, dev-ready Figma files, motion specs, and pairing sessions during build.' }
      ],
      note: 'Timelines flex with scope · This is a typical 6-week engagement.'
    },
    experience: {
      eyebrow: 'Experience',
      headline: 'Two years. Four companies. <em>One discipline.</em>',
      items: [
        { now: true, when: 'Dec 2025 - Dec 2026 · South Cikarang · Now', title: 'Product Designer', org: 'PT. Ragdalion Revolusi Industry', desc: '', bullets: ['Coordinated client meetings to gather business and user requirements, identifying pain points and opportunities for better design solutions.', 'Developed and engineered flexible design systems for manufacturing and general industries, ensuring scalability and usability.', 'Collaborated with developers to implement design concepts, optimizing quality, and managing project timelines for efficient execution.'] },
        { now: false, when: 'Jun 2025 – Dec 2025 · South Cikarang', title: 'UI/UX Designer (Contract)', org: 'PT. Ragdalion Revolusi Industry', desc: 'Leading design on enterprise-grade products including the LPPOM Digital Platform. Owning end-to-end from research through developer handoff, partnering directly with frontend, backend, and PM teams.', bullets: ['Shipped LPPOM Digital Platform across 3 surfaces in 4 months', 'Established cross-platform design system from scratch', 'Reduced design-to-engineering handoff friction with structured handoff docs'] },
        { now: false, when: 'Dec 2024 – Mar 2025 · Remote', title: 'UI/UX Designer (Freelance)', org: 'PT. Ragdalion Revolusi Industry', desc: 'Continued partnership post-internship on bespoke product engagements. Worked async with distributed teams across Cikarang and remote.', bullets: [] },
        { now: false, when: 'May – Nov 2024 · Onsite, South Cikarang', title: 'UI/UX Designer (Internship)', org: 'PT. Ragdalion Revolusi Industry', desc: 'Onboarding into industry-grade product workflows. Contributed to multiple shipped products and proved out the partnership that led to ongoing freelance and contract roles.', bullets: [] },
        { now: false, when: 'May – Nov 2024 · Remote', title: 'UI/UX Designer (Internship)', org: 'Digimarly', desc: 'Parallel internship focused on digital marketing & client web projects. Sharpened skills in fast-turnaround design under client constraints.', bullets: [] },
        { now: false, when: 'May – Jul 2024 · Remote, Semarang', title: 'UI/UX Designer (Internship)', org: 'Azura Labs', desc: 'Short-form internship contributing to product design exercises and team workflows.', bullets: [] },
        { now: false, when: 'Dec 2023 – Mar 2024 · Remote, Yogyakarta', title: 'UI/UX Designer (Internship)', org: 'Eduwork', desc: 'Early-career foundation. Worked on edu-tech product flows, built familiarity with stakeholder communication.', bullets: [] },
        { now: false, when: 'Aug 2022 – Jan 2023 · Online', title: 'UI/UX Research & Design', org: 'Binar Academy · Studi Independen Kampus Merdeka', desc: 'Where it started. Six-month government-funded independent study. Built the research-first design foundation that still shapes my work today.', bullets: [] }
      ]
    },
    testimonials: {
      eyebrow: 'What they said',
      headline: 'A few words from people <em>I shipped with.</em>',
      items: [
        { quote: "Hasan didn't just hand us Figma files — he stayed in the PRs. Our handoff cycle dropped from days to hours.", name: 'Adi Pranoto', role: 'Engineering Lead · Ragdalion', initial: 'A' },
        { quote: "He asked the awkward questions early so we didn't have to fix them late. That's worth a quarter of dev time saved.", name: 'Rina Halim', role: 'Product Manager · LPPOM Digital', initial: 'R' },
        { quote: 'The design system Hasan built is still the spine of our product, eight months after he handed it over.', name: 'Faiz Hakim', role: 'CTO · Logistics Client', initial: 'F' }
      ]
    },
    contact: {
      eyebrow: "Let's work together",
      headline: "Got a project? <em>I'd love to hear about it.</em>",
      desc: "I'm currently booking projects starting Q2 2026. Whether you have a fully-scoped brief or just an early-stage idea, the best next step is a 30-minute intro call. No pitch deck. No commitment.",
      email: 'hasanjobs3@gmail.com',
      emailNote: 'Replies within 24 hours',
      phone: '+62 852-5430-8418',
      phoneNote: 'WhatsApp preferred · GMT+7',
      location: 'East Jakarta, Indonesia',
      locationNote: 'Open to remote work globally',
      socials: {
        linkedin: '#',
        dribbble: '#',
        behance: '#',
        instagram: '#'
      }
    },
    footer: {
      tagline: 'Designing digital products that ship — and stick. East Jakarta · Open to remote globally.',
      copyright: '© 2026 Hasan Waulat. Designed & built by hand in Jakarta.',
      nowList: ['Designing — LPPOM Digital', 'Available — Q2 2026', 'Reply time — < 24 hours', 'GMT+7 · East Jakarta']
    }
  };

  const DEFAULT_ID = {
    header: {
      cvPath: 'cv/Hasan-Waulat-CV.pdf',
      waNumber: '6285254308418',
      waMessage: 'Halo Hasan, saya tertarik bekerja sama',
      brandName: 'Hasan Waulat',
      brandTitle: 'UI/UX Designer',
      brandInitial: 'h'
    },
    hero: {
      eyebrow: 'Tersedia untuk proyek · Q2 2026',
      headlineLines: [
        'Saya mendesain sistem digital',
        'yang mudah dipakai tim Anda',
        'dan terukur <em>hasilnya.</em>'
      ],
      sub: 'UI/UX Designer dengan <strong>32 produk rilis</strong> di sektor fintech, logistik, pemerintahan, dan HR‑tech. Membantu tim merilis antarmuka yang benar-benar dituntaskan pengguna — dan bisnis yang bertumbuh nyata.',
      ctaPrimary: 'Lihat karya pilihan',
      ctaPrimaryHref: '#work',
      ctaSecondaryText: 'Semua Proyek (32)',
      ctaSecondaryHref: 'projects/index.html',
      ctaTertiaryText: 'Jadwalkan diskusi 30 menit',
      ctaTertiaryHref: '#contact',
      trust: ['LPPOM MUI', 'Kementerian Keuangan', 'Ragdalion', 'Binar Academy', 'Eduwork'],
      nowBadge: 'Sedang mendesain — Platform Digital LPPOM',
      photo: 'assets/profile.png',
      scrollCue: 'Gulir ke bawah — ada bukti nyata'
    },
    metrics: [
      { value: 2, suffix: '+ thn', label: 'dalam desain produk' },
      { value: 32, suffix: '', label: 'proyek rilis di 4 industri' },
      { value: 15, suffix: '', label: 'klien puas di Asia Tenggara' }
    ],
    about: {
      eyebrow: 'Tentang',
      headline: 'Saya menjembatani kebutuhan pengguna dan tujuan bisnis — <em>tanpa terlihat rumit.</em>',
      paragraphs: [
        "Halo, saya <strong>Hasan</strong>. Saya mulai mendesain pada tahun 2022 melalui program studi independen Binar Academy, dan selama dua setengah tahun berikutnya telah merilis <strong>32 produk nyata</strong> — mulai dari platform sertifikasi halal yang digunakan ribuan pelaku usaha di Indonesia, sistem HR internal, hingga aplikasi informasi regulasi hukum pemerintah.",
        "Saya bukan tipe desainer yang hanya menyerahkan file Figma lalu menghilang. Saya duduk bersama engineer, mengajukan pertanyaan mendasar ke product manager, melakukan usability testing meskipun deadline ketat, dan merawat dokumen developer-handoff sama telitinya dengan visual desain. Tujuannya bukan sekadar layar yang cantik — tetapi produk yang berfungsi nyata bagi pengguna dan tim pembangunnya.",
        "Saat ini saya berbasis di <strong>Jakarta Timur</strong>, mengerjakan platform web dan mobile tingkat enterprise — dan terbuka untuk kerja remote secara global."
      ],
      ctaText: 'Ingin cerita selengkapnya? Unduh CV saya →',
      nowCard: [
        { k: 'Mendesain', v: 'Platform Digital LPPOM — <em>mobile, web admin, iPad</em>' },
        { k: 'Membaca', v: 'Refactoring UI oleh Adam Wathan & Steve Schoger' },
        { k: 'Mempelajari', v: 'Motion design dengan <em>Lottie & Rive</em>' },
        { k: 'Lokasi', v: 'Jakarta Timur · terbuka untuk remote' },
        { k: 'Waktu Balas', v: 'Kurang dari 24 jam' }
      ]
    },
    customers: [
      { initial: 'L', name: 'LPPOM MUI' },
      { initial: 'K', name: 'Kementerian Keuangan' },
      { initial: 'R', name: 'Ragdalion' },
      { initial: 'B', name: 'Binar Academy' },
      { initial: 'E', name: 'Eduwork' },
      { initial: 'D', name: 'Digimarly' },
      { initial: 'A', name: 'Azura Labs' },
      { initial: 'J', name: 'JDIH Kemenkeu' }
    ],
    skills: {
      eyebrow: 'Keahlian & kapabilitas',
      headline: 'Lebih dari sekadar desainer — saya mengawal produk dari <em>brief hingga rilis.</em>',
      desc: 'Banyak tim merekrut desainer lalu bingung mengisi celah lainnya — siapa yang merumuskan requirement, mengelola sprint, dan menjaga keselarasan pasca-peluncuran? Saya mencakup seluruh alur tersebut. Satu orang, tiga peran, tanpa distorsi komunikasi.',
      pillars: [
        {
          role: 'Peran 01 · Designer',
          title: 'Keahlian <em>desain</em> — antarmuka yang siap rilis dan bertahan lama.',
          desc: 'Desain produk menyeluruh dari riset hingga handoff. Bagian visual yang terlihat — namun hanya permukaan dari apa yang saya kerjakan.',
          items: ['Riset pengguna, wawancara & usability testing', 'Arsitektur informasi & user flows', 'Wireframe, UI hi-fi, prototipe interaktif', 'Design system & komponen library', 'Mobile, web, iPad — multi-platform', 'Spesifikasi motion & dokumen developer handoff'],
          stack: ['Figma', 'Framer', 'Maze', 'Tokens Studio', 'Lottie']
        },
        {
          role: 'Peran 02 · Business Analyst',
          title: 'Jembatan <em>komunikasi</em> — mengubah brief abstrak menjadi spesifikasi siap bangun.',
          desc: 'Saya menghubungkan stakeholder dan tim engineering, menyusun dokumen requirement, dan memastikan apa yang dibangun sesuai kebutuhan nyata.',
          items: ['Elisitas kebutuhan stakeholder & user', 'Pemetaan proses bisnis (BPMN, swimlanes)', 'Kebutuhan fungsional & non-fungsional (FRD/PRD)', 'Penulisan use-case & pemecahan user-story', 'Gap analysis & benchmarking kompetitor', 'Kriteria penerimaan & skenario UAT'],
          stack: ['Notion', 'Confluence', 'Whimsical', 'Miro', 'Lucidchart']
        },
        {
          role: 'Peran 03 · Project Driver',
          title: 'Pengarah <em>proyek</em> — dari kickoff hingga go-live tanpa kendala.',
          desc: 'Saya mengawal siklus proyek: ruang lingkup, jadwal, ritme sprint, QA, peluncuran — menjaga desain, engineer, dan stakeholder tetap selaras.',
          items: ['Perencanaan lingkup & jadwal proyek', 'Sprint planning & koordinasi agile', 'Penyelarasan tim lintas divisi', 'Review QA & fasilitasi UAT', 'Rencana rilis & kesiapan go-live', 'Monitoring pasca-rilis & siklus iterasi'],
          stack: ['Jira', 'ClickUp', 'Trello', 'Slack', 'Linear']
        }
      ],
      e2e: [
        { n: '01', label: 'Brief', role: 'BA' },
        { n: '02', label: 'Kebutuhan', role: 'BA' },
        { n: '03', label: 'Desain', role: 'Designer' },
        { n: '04', label: 'Bangun', role: 'PM · Designer' },
        { n: '05', label: 'QA & UAT', role: 'PM · BA' },
        { n: '06', label: 'Rilis', role: 'PM' }
      ]
    },
    services: {
      eyebrow: 'Layanan',
      headline: 'Tiga hal yang akan saya lakukan <em>untuk tim Anda.</em>',
      cards: [
        {
          num: '01',
          title: 'Menemukan masalah nyata sebelum merancang solusi.',
          desc: 'Saya melakukan wawancara pengguna, uji kegunaan, dan analisis kompetitor untuk memastikan kita membangun solusi yang tepat — bukan sekadar yang termudah dibuat.',
          items: ['Wawancara stakeholder & riset pengguna', 'Pemetaan persona & journey map', 'Usability testing — Maze, langsung, remote', 'Laporan insight yang actionable bagi PM'],
          tools: 'Maze · Notion · Whimsical'
        },
        {
          num: '02',
          title: 'Desain yang siap bersaing di setiap sprint.',
          desc: 'Dari wireframe hingga prototipe interaktif, saya merancang antarmuka yang teruji pada pengguna nyata — dan rilis tanpa kejutan saat QA.',
          items: ['Wireframe & prototipe interaktif', 'UI high-fidelity untuk mobile, web & iPad', 'Spesifikasi motion untuk handoff engineering', 'Tata letak ramah aksesibilitas (WCAG-aware)'],
          tools: 'Figma · Framer'
        },
        {
          num: '03',
          title: 'Sistem desain terukur untuk skala jangka panjang.',
          desc: 'Saya membangun design system yang mudah digunakan engineer — berbasis token, terdokumentasi, dan selaras dengan codebase tim.',
          items: ['Design tokens — warna, tipografi, spasi, animasi', 'Component library dengan varian & state', 'Dokumentasi handoff siap pakai untuk developer', 'Living style guide yang fleksibel dikembangkan'],
          tools: 'Figma · Tokens Studio · Storybook'
        }
      ]
    },
    process: {
      eyebrow: 'Cara Kerja',
      headline: 'Transparan dan jelas. Alur kerja terstruktur dari <em>kickoff</em> hingga <em>handoff.</em>',
      steps: [
        { n: '01', week: 'Minggu 1', title: 'Discover', desc: 'Wawancara stakeholder, riset pengguna, analisis kompetitor. Target: memahami masalah mendasar.' },
        { n: '02', week: 'Minggu 1–2', title: 'Define', desc: 'Sintesis temuan menjadi sasaran produk, user flow, dan kriteria keberhasilan yang terukur.' },
        { n: '03', week: 'Minggu 2–3', title: 'Design', desc: 'Eksplorasi wireframe, prototipe klik, dan iterasi cepat sebelum masuk ke tahap visual mendalam.' },
        { n: '04', week: 'Minggu 3–4', title: 'Polish & Test', desc: 'Visual UI high-fidelity, spesifikasi motion, dan usability test untuk memvalidasi alur.' },
        { n: '05', week: 'Minggu 4+', title: 'Handoff & Build', desc: 'Dokumentasi token, sesi walkthrough dengan engineer, dan pendampingan implementasi QA.' }
      ],
      note: 'Sprint fleksibel 2–4 minggu · Demo berkala setiap akhir pekan'
    },
    experience: {
      eyebrow: 'Pengalaman',
      headline: 'Dua tahun. Empat perusahaan. <em>Satu disiplin.</em>',
      items: [
        { now: true, when: 'Des 2025 - Des 2026 · Cikarang Selatan · Sekarang', title: 'Product Designer', org: 'PT. Ragdalion Revolusi Industry', desc: '', bullets: ['Mengkoordinasikan pertemuan klien untuk menggali kebutuhan bisnis dan pengguna, mengidentifikasi pain point dan peluang solusi desain yang lebih baik.', 'Merancang dan mengembangkan sistem desain yang fleksibel untuk sektor manufaktur dan industri umum guna menjamin skalabilitas dan kemudahan pakai.', 'Berkolaborasi dengan developer untuk mengimplementasikan konsep desain, mengoptimalkan kualitas, dan mengelola jadwal proyek agar eksekusi efisien.'] },
        { now: false, when: 'Jun 2025 – Des 2025 · Cikarang Selatan', title: 'UI/UX Designer (Kontrak)', org: 'PT. Ragdalion Revolusi Industry', desc: 'Memimpin desain produk skala enterprise termasuk Platform Digital LPPOM. Mengawal siklus menyeluruh dari riset hingga developer handoff, bermitra langsung dengan frontend, backend, dan tim PM.', bullets: ['Merilis Platform Digital LPPOM di 3 platform (web, mobile, iPad) dalam 4 bulan', 'Membangun cross-platform design system dari nol', 'Menurunkan hambatan komunikasi desain-ke-engineering dengan dokumen handoff terstruktur'] },
        { now: false, when: 'Des 2024 – Mar 2025 · Remote', title: 'UI/UX Designer (Freelance)', org: 'PT. Ragdalion Revolusi Industry', desc: 'Kemitraan lanjutan pasca-magang untuk proyek produk pesanan khusus. Bekerja secara async bersama tim terdistribusi di Cikarang dan remote.', bullets: [] },
        { now: false, when: 'Mei – Nov 2024 · Onsite, Cikarang Selatan', title: 'UI/UX Designer (Magang)', org: 'PT. Ragdalion Revolusi Industry', desc: 'Adaptasi ke workflow produk skala industri. Berkontribusi pada berbagai produk yang rilis dan membuktikan kemitraan yang berlanjut ke peran freelance dan kontrak.', bullets: [] },
        { now: false, when: 'Mei – Nov 2024 · Remote', title: 'UI/UX Designer (Magang)', org: 'Digimarly', desc: 'Magang paralel dengan fokus pada digital marketing & web klien. Mengasah kemampuan desain cepat di bawah batasan waktu klien.', bullets: [] },
        { now: false, when: 'Mei – Jul 2024 · Remote, Semarang', title: 'UI/UX Designer (Magang)', org: 'Azura Labs', desc: 'Magang singkat berkontribusi pada eksplorasi desain produk dan alur kerja tim.', bullets: [] },
        { now: false, when: 'Des 2023 – Mar 2024 · Remote, Yogyakarta', title: 'UI/UX Designer (Magang)', org: 'Eduwork', desc: 'Fondasi awal karir. Merancang alur produk edu-tech, membangun kebiasaan komunikasi dengan stakeholder.', bullets: [] },
        { now: false, when: 'Agu 2022 – Jan 2023 · Online', title: 'UI/UX Research & Design', org: 'Binar Academy · Studi Independen Kampus Merdeka', desc: 'Awal perjalanan. Studi independen 6 bulan bersertifikat Kemendikbud. Membangun fondasi riset desain yang menjadi pedoman kerja hingga hari ini.', bullets: [] }
      ]
    },
    testimonials: {
      eyebrow: 'Apa Kata Mereka',
      headline: 'Sepatah kata dari rekan kerja <em>dalam berbagai proyek.</em>',
      items: [
        { quote: "Hasan tidak hanya menyerahkan file Figma — ia ikut mendampingi di pull request. Waktu siklus handoff kami berkurang dari berhari-hari menjadi hitungan jam.", name: 'Adi Pranoto', role: 'Engineering Lead · Ragdalion', initial: 'A' },
        { quote: "Ia berani mengajukan pertanyaan mendasar di awal sehingga kami tidak perlu merombak ulang di akhir. Itu menghemat banyak waktu tim dev.", name: 'Rina Halim', role: 'Product Manager · LPPOM Digital', initial: 'R' },
        { quote: 'Design system yang dibangun Hasan tetap menjadi tulang punggung produk kami, delapan bulan setelah diserahterimakan.', name: 'Faiz Hakim', role: 'CTO · Klien Logistik', initial: 'F' }
      ]
    },
    contact: {
      eyebrow: 'Mari Bekerja Sama',
      headline: 'Punya proyek menarik? <em>Mari diskusikan.</em>',
      desc: 'Saya terbuka untuk proyek baru mulai Q2 2026. Baik brief yang sudah lengkap maupun ide tahap awal, langkah terbaik adalah diskusi singkat 30 menit tanpa komitmen.',
      email: 'hasanjobs3@gmail.com',
      emailNote: 'Balas dalam < 24 jam',
      phone: '+62 852-5430-8418',
      phoneNote: 'Disukai via WhatsApp · GMT+7',
      location: 'Jakarta Timur, Indonesia',
      locationNote: 'Terbuka untuk remote global',
      socials: {
        linkedin: '#',
        dribbble: '#',
        behance: '#',
        instagram: '#'
      }
    },
    footer: {
      tagline: 'Mendesain produk digital yang rilis — dan berdampak nyata. Jakarta Timur · Terbuka untuk remote global.',
      copyright: '© 2026 Hasan Waulat. Didesain & dibangun mandiri di Jakarta.',
      nowList: ['Mendesain — LPPOM Digital', 'Tersedia — Q2 2026', 'Waktu Balas — < 24 jam', 'GMT+7 · Jakarta Timur']
    }
  };

  const DEFAULT = DEFAULT_EN;

  /* ---------- Storage ---------- */
  function deepMerge(base, override) {
    if (Array.isArray(override) || override === null || typeof override !== 'object') return override;
    const out = { ...base };
    for (const k in override) {
      if (k in base && base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) {
        out[k] = deepMerge(base[k], override[k]);
      } else {
        out[k] = override[k];
      }
    }
    return out;
  }

  function getActiveLang() {
    return 'en';
  }

  function load(lang) {
    const l = lang || 'en';
    const def = (l === 'id') ? DEFAULT_ID : DEFAULT_EN;
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return clone(def);
      const parsed = JSON.parse(raw);

      // Multilingual structure: { en: {...}, id: {...} }
      if (parsed && (parsed.en || parsed.id)) {
        const langData = parsed[l] || (l === 'en' ? parsed : {});
        return deepMerge(def, langData);
      }

      // Flat structure
      return deepMerge(def, parsed);
    } catch (e) {
      console.warn('SiteStore: load failed', e);
      return clone(def);
    }
  }

  function save(data, lang) {
    if (data && (data.en || data.id)) {
      if (data.en) save(data.en, 'en');
      if (data.id) save(data.id, 'id');
      return { ok: true };
    }
    const l = lang || getActiveLang();
    try {
      let raw = {};
      try {
        const existing = localStorage.getItem(KEY);
        if (existing) raw = JSON.parse(existing) || {};
      } catch (_) {}

      // Normalize if raw was legacy flat object
      if (!raw.en && !raw.id && (raw.hero || raw.about)) {
        raw = { en: clone(raw), id: clone(DEFAULT_ID) };
      }
      if (!raw.en) raw.en = clone(DEFAULT_EN);
      if (!raw.id) raw.id = clone(DEFAULT_ID);

      raw[l] = data;

      // Keep root properties updated for backward compatibility
      Object.keys(data).forEach(k => { raw[k] = data[k]; });

      localStorage.setItem(KEY, JSON.stringify(raw));
      window.dispatchEvent(new CustomEvent('hw-site-changed', { detail: { lang: l, data: data } }));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message || 'Storage failed' };
    }
  }

  function reset(lang) {
    if (!lang || lang === 'all') {
      localStorage.removeItem(KEY);
      window.dispatchEvent(new CustomEvent('hw-site-changed', { detail: { lang: getActiveLang() } }));
      return;
    }
    const l = lang;
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
      if (raw[l]) delete raw[l];
      localStorage.setItem(KEY, JSON.stringify(raw));
    } catch (_) {
      localStorage.removeItem(KEY);
    }
    window.dispatchEvent(new CustomEvent('hw-site-changed', { detail: { lang: l } }));
  }

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function exportJSON() {
    const data = {
      en: load('en'),
      id: load('id'),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hasan-site-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  function importJSON(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => {
        try {
          const data = JSON.parse(r.result);
          if (data.en) save(data.en, 'en');
          if (data.id) save(data.id, 'id');
          if (!data.en && !data.id) save(data, 'id');
          resolve(data);
        } catch (e) { reject(e); }
      };
      r.onerror = reject;
      r.readAsText(file);
    });
  }

  function fileToCompressedDataURL(file, maxWidth, quality) {
    maxWidth = maxWidth || 1200;
    quality  = quality  || 0.85;

    // Try server upload first (stores file locally, returns path)
    if (window.ImageUpload) {
      return window.ImageUpload.upload(file, maxWidth, quality);
    }

    // Fallback: base64
    return new Promise((resolve, reject) => {
      if (!file) return reject(new Error('No file'));
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, maxWidth / img.naturalWidth);
          const w = Math.round(img.naturalWidth * scale);
          const h = Math.round(img.naturalHeight * scale);
          const canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  global.SiteStore = {
    DEFAULT,
    DEFAULT_EN,
    DEFAULT_ID,
    load,
    save,
    reset,
    exportJSON,
    importJSON,
    fileToCompressedDataURL
  };
})(window);
