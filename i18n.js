/* ============================================================
   i18n — Language Switcher (Indonesian & English)
   Persists selection in localStorage ('hw_lang').
   Default: 'en'
   ============================================================ */
(function (global) {
  'use strict';

  var LANG_KEY = 'hw_lang';
  var currentLang = 'en';

  try {
    localStorage.setItem(LANG_KEY, 'en');
  } catch (e) {}

  var DICT = {
    en: {
      nav: {
        work: 'Work',
        about: 'About',
        skills: 'Skills',
        services: 'Services',
        process: 'Process',
        handheld: 'Project Handheld',
        experience: 'Experience',
        contact: 'Contact',
        downloadCv: 'Download CV',
        whatsApp: 'WhatsApp',
        allProjects: 'All Projects',
        liveSite: 'Live Site',
        cmsHome: 'CMS Home'
      },
      hero: {
        eyebrow: 'Available for projects · Q2 2026',
        words: [
          '<span class="w">I&nbsp;design</span> <span class="w">digital</span> <span class="w">products</span>',
          '<span class="w">that&nbsp;move</span> <span class="w accent">metrics</span><span class="w"> —</span>',
          '<span class="w">not&nbsp;just</span> <span class="w display-italic accent">hearts.</span>'
        ],
        sub: 'UI/UX Designer with <strong>32 shipped products</strong> across fintech, logistics, government, and HR‑tech. I help teams ship interfaces that users actually finish — and businesses that actually grow.',
        ctaPrimary: 'See selected work',
        ctaSecondary: 'All Projects (32)',
        ctaTertiary: 'Book a 30-min intro call',
        nowBadge: 'Currently designing — LPPOM Digital Platform',
        scrollCue: "Scroll — there's proof below"
      },
      metrics: {
        m1: 'in product design',
        m2: 'projects shipped across 4 industries',
        m3: 'satisfied clients across SE Asia'
      },
      about: {
        eyebrow: 'About',
        headline: 'I bridge user needs and business goals — <span class="accent display-italic">without making it look hard.</span>',
        p1: "Hi, I'm <strong>Hasan</strong>. I started designing in 2022 through Binar Academy's independent study program, and over the next two and a half years I've shipped <strong>32 real products</strong> — from a halal certification platform used by thousands of Indonesian businesses, to internal HR tools, to government legal-information apps.",
        p2: 'What I\'m not is a designer who hands over Figma files and disappears. I sit with engineers, ask product managers the awkward questions, run usability tests when timelines say "just ship it," and obsess over the developer-handoff doc as much as the visual polish. The goal isn\'t pretty screens — it\'s products that work for the people using them and the teams building them.',
        p3: "Right now I'm based in <strong>East Jakarta</strong>, working on enterprise-grade mobile and web platforms — and I'm open to remote work globally.",
        cta: 'Want the full story? Download my CV →',
        nowTitle: 'Currently',
        nowLive: '● live',
        nowRows: [
          { k: 'Designing', v: 'LPPOM Digital Platform — <em>mobile, web admin, iPad</em>' },
          { k: 'Reading', v: 'Refactoring UI by Adam Wathan & Steve Schoger' },
          { k: 'Learning', v: 'Motion design with <em>Lottie & Rive</em>' },
          { k: 'Based in', v: 'East Jakarta · open to remote' },
          { k: 'Reply in', v: 'Under 24 hours' }
        ]
      },
      archive: {
        eyebrow: 'Projects handled',
        headline: 'A list of every product I\'ve <span class="accent display-italic">put hands on.</span>',
        desc: 'Selected, contract, freelance — every shipped project across two years of design work. Click any card for the case study.',
        allFilter: 'All',
        showing: function (count, total) { return 'Showing ' + count + ' of ' + total; },
        viewAllBtn: 'View all 32 projects',
        viewCaseStudy: 'View case study →'
      },
      services: {
        eyebrow: 'Services',
        headline: 'Three things I\'ll do <span class="accent display-italic">for your team.</span>',
        cards: [
          {
            title: 'Find the real problem before designing the solution.',
            desc: "I run user interviews, usability testing, and competitive teardowns to make sure we're building the right thing — not just the thing that was easiest to spec.",
            items: [
              'Stakeholder interviews & user research',
              'Persona & journey mapping',
              'Usability testing — Maze, in-person, remote',
              'Insight reports your PM will actually read'
            ]
          },
          {
            title: 'Designs that earn their place in the sprint.',
            desc: 'From low-fi wireframes to interactive prototypes, I design interfaces that survive contact with real users — and ship without surprises in QA.',
            items: [
              'Wireframes & interactive prototypes',
              'High-fidelity UI for mobile, web & iPad',
              'Motion specs for engineering handoff',
              'Accessibility-conscious layouts (WCAG-aware)'
            ]
          },
          {
            title: 'Systems that scale beyond the first sprint.',
            desc: 'I build design systems engineers can actually consume — tokenized, documented, and aligned with your codebase. No more "12 or 14?" arguments in PR review.',
            items: [
              'Design tokens — colors, type, spacing, motion',
              'Component libraries with variants & states',
              'Developer-ready handoff documentation',
              'Living style guide your team can extend'
            ]
          }
        ]
      },
      skills: {
        eyebrow: 'Skills & capabilities',
        headline: 'More than a designer — I drive products from <span class="accent display-italic">brief to go-live.</span>',
        desc: 'Most teams hire a designer and then scramble to fill the gaps — who writes the requirements, who manages the sprint, who keeps everyone aligned post-launch? I cover that whole arc. One person, three hats, zero translation loss.',
        pillars: [
          {
            role: 'Role 01 · Designer',
            title: 'The <em>craft</em> — interfaces that ship and stick.',
            desc: 'End-to-end product design from research to handoff. The visible work — but only the surface of what I do.',
            items: [
              'User research, interviews & usability testing',
              'Information architecture & user flows',
              'Wireframes, hi-fi UI, interactive prototypes',
              'Design systems & component libraries',
              'Mobile, web, iPad — multi-surface design',
              'Motion specs & developer handoff docs'
            ]
          },
          {
            role: 'Role 02 · Business Analyst',
            title: 'The <em>translator</em> — turning fuzzy briefs into shippable specs.',
            desc: 'I sit between stakeholders and engineering, write the requirements doc, and make sure what gets built is what was actually needed.',
            items: [
              'Stakeholder & requirement elicitation',
              'Business process mapping (BPMN, swimlanes)',
              'Functional & non-functional requirements (FRD/PRD)',
              'Use-case writing & user-story breakdown',
              'Gap analysis & competitor benchmarking',
              'Acceptance criteria & UAT scenarios'
            ]
          },
          {
            role: 'Role 03 · Project Driver',
            title: 'The <em>conductor</em> — kickoff to go-live, no dropped batons.',
            desc: 'I own the project arc end-to-end: scope, schedule, sprint cadence, QA, launch — keeping design, engineering, and stakeholders in sync.',
            items: [
              'Project scoping & timeline planning',
              'Sprint planning & agile ceremonies',
              'Cross-functional team coordination',
              'QA review & UAT facilitation',
              'Release planning & go-live readiness',
              'Post-launch monitoring & iteration cycles'
            ]
          }
        ],
        e2e: ['Brief', 'Requirements', 'Design', 'Build', 'QA & UAT', 'Go-Live']
      },
      process: {
        eyebrow: 'How I work',
        headline: 'No mysteries. Just a clear process from <span class="accent display-italic">kickoff</span> to <span class="accent display-italic">handoff.</span>',
        steps: [
          { week: 'Week 1', title: 'Discover', desc: 'Stakeholder interviews, user research, competitive analysis. Goal: understand the real problem.' },
          { week: 'Week 1–2', title: 'Define', desc: 'Synthesize findings into clear product objectives, user flows, and success criteria.' },
          { week: 'Week 2–4', title: 'Design', desc: 'Wireframes → high-fidelity → interactive prototypes. Tight feedback loops every 2-3 days.' },
          { week: 'Week 4–5', title: 'Validate', desc: 'Usability testing with 5+ users via Maze or moderated sessions. Iterate on real evidence.' },
          { week: 'Week 5+', title: 'Handoff', desc: 'Tokenized design system, dev-ready Figma files, motion specs, and pairing sessions during build.' }
        ],
        note: 'Timelines flex with scope · This is a typical 6-week engagement.'
      },
      experience: {
        eyebrow: 'Experience',
        headline: 'Two years. Four companies. <span class="accent display-italic">One discipline.</span>'
      },
      contact: {
        eyebrow: "Let's work together",
        headline: 'Got a project? <span class="accent display-italic">I\'d love to hear about it.</span>',
        desc: "I'm currently booking projects starting Q2 2026. Whether you have a fully-scoped brief or just an early-stage idea, the best next step is a 30-minute intro call. No pitch deck. No commitment.",
        emailNote: 'Replies within 24 hours',
        phoneNote: 'WhatsApp preferred · GMT+7',
        loc: 'East Jakarta, Indonesia',
        locNote: 'Open to remote work globally',
        formTitle: 'Send a message',
        formDesc: 'I read every one. Reply within 24 hours.',
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email',
        emailPlaceholder: 'you@company.com',
        companyLabel: 'Company / Project',
        companyPlaceholder: 'Optional',
        typeLabel: 'Project type',
        typeOptions: ['Mobile App', 'Web App', 'Design System', 'Brand Site', 'Other'],
        budgetLabel: 'Budget range',
        budgetOptions: ['Not sure yet', '< $2k', '$2k – $5k', '$5k – $10k', '$10k+'],
        messageLabel: 'Tell me about it',
        messagePlaceholder: "What are you working on? What's the timeline, the constraints, the vibe?",
        submitBtn: 'Send message',
        waFallback: 'Or message me on WhatsApp →'
      },
      footer: {
        tagline: 'Designing digital products that ship — and stick. East Jakarta · Open to remote globally.',
        sitemap: 'Sitemap',
        now: 'Now',
        nowItems: [
          'Designing — LPPOM Digital',
          'Available — Q2 2026',
          'Reply time — < 24 hours',
          'GMT+7 · East Jakarta'
        ],
        copyright: '© 2026 Hasan Waulat. Designed & built by hand in Jakarta.',
        themeCue: 'Press <kbd style="border:1px solid var(--border); padding: 2px 6px; border-radius: 4px;">T</kbd> to switch theme · <a href="#top" style="color: var(--accent); margin-left: 12px;">Top ↑</a>'
      },
      projectsArchive: {
        back: '← Back to home',
        eyebrow: 'Archive',
        headline: 'All projects, <span class="accent display-italic">in one place.</span>',
        stats: {
          shipped: 'Projects shipped',
          industries: 'Industries',
          companies: 'Companies',
          prod: 'In production'
        },
        all: 'All',
        viewCaseStudy: 'View case study →',
        noMatch: function (f) { return 'No projects match "' + f + '".'; }
      },
      projectDetail: {
        back: '← All projects',
        notFoundTitle: 'Project not found',
        notFoundDesc: 'This project may have been deleted.',
        backToProjects: 'Back to all projects →',
        wantProject: 'Want a project like this for your team?',
        moreProjects: 'More projects',
        startProject: 'Start a project'
      }
    },
    id: {
      nav: {
        work: 'Karya',
        about: 'Tentang',
        skills: 'Keahlian',
        services: 'Layanan',
        process: 'Proses',
        handheld: 'Handheld',
        experience: 'Pengalaman',
        contact: 'Kontak',
        downloadCv: 'Unduh CV',
        whatsApp: 'WhatsApp',
        allProjects: 'Semua Proyek',
        liveSite: 'Situs Utama',
        cmsHome: 'Beranda CMS'
      },
      hero: {
        eyebrow: 'Tersedia untuk proyek · Q2 2026',
        words: [
          '<span class="w">Saya&nbsp;mendesain</span> <span class="w">sistem</span> <span class="w">digital</span>',
          '<span class="w">yang&nbsp;mudah</span> <span class="w">dipakai</span> <span class="w">tim</span> <span class="w">Anda</span>',
          '<span class="w">dan</span> <span class="w accent">terukur</span> <span class="w display-italic accent">hasilnya.</span>'
        ],
        sub: 'UI/UX Designer dengan <strong>32 produk rilis</strong> di sektor fintech, logistik, pemerintahan, dan HR‑tech. Membantu tim merilis antarmuka yang benar-benar dituntaskan pengguna — dan bisnis yang bertumbuh nyata.',
        ctaPrimary: 'Lihat karya pilihan',
        ctaSecondary: 'Semua Proyek (32)',
        ctaTertiary: 'Jadwalkan diskusi 30 menit',
        nowBadge: 'Sedang mendesain — Platform Digital LPPOM',
        scrollCue: 'Gulir ke bawah — ada bukti nyata'
      },
      metrics: {
        m1: 'dalam desain produk',
        m2: 'proyek rilis di 4 industri',
        m3: 'klien puas di Asia Tenggara'
      },
      about: {
        eyebrow: 'Tentang',
        headline: 'Menjembatani kebutuhan pengguna dan tujuan bisnis — <span class="accent display-italic">tanpa membuatnya tampak rumit.</span>',
        p1: 'Halo, saya <strong>Hasan</strong>. Saya mulai mendesain pada tahun 2022 melalui program studi independen Binar Academy, dan selama dua setengah tahun berikutnya telah merilis <strong>32 produk nyata</strong> — mulai dari platform sertifikasi halal yang digunakan ribuan pelaku usaha di Indonesia, sistem HR internal, hingga aplikasi informasi regulasi hukum pemerintah.',
        p2: 'Saya bukan tipe desainer yang hanya menyerahkan file Figma lalu menghilang. Saya duduk bersama engineer, menanyakan hal krusial kepada product manager, menjalankan usability test saat tenggat waktu mendesak, serta memperhatikan dokumentasi serah-terima pengembang sama detailnya dengan polesan visual. Tujuannya bukan sekadar layar cantik — melainkan produk yang bekerja efektif bagi pengguna dan tim yang mengembangkannya.',
        p3: 'Saat ini saya berbasis di <strong>Jakarta Timur</strong>, mengerjakan platform web dan mobile tingkat enterprise — serta terbuka untuk peluang kerja remote secara global.',
        cta: 'Ingin cerita selengkapnya? Unduh CV saya →',
        nowTitle: 'Saat ini',
        nowLive: '● aktif',
        nowRows: [
          { k: 'Mendesain', v: 'Platform Digital LPPOM — <em>mobile, web admin, iPad</em>' },
          { k: 'Membaca', v: 'Refactoring UI karya Adam Wathan & Steve Schoger' },
          { k: 'Mempelajari', v: 'Motion design dengan <em>Lottie & Rive</em>' },
          { k: 'Berbasis di', v: 'Jakarta Timur · terbuka untuk remote' },
          { k: 'Respons', v: 'Kurang dari 24 jam' }
        ]
      },
      archive: {
        eyebrow: 'Proyek yang ditangani',
        headline: 'Daftar setiap produk yang <span class="accent display-italic">pernah saya tangani.</span>',
        desc: 'Pilihan, kontrak, freelance — setiap proyek yang dirilis selama dua tahun berkarya. Klik kartu untuk melihat studi kasus.',
        allFilter: 'Semua',
        showing: function (count, total) { return 'Menampilkan ' + count + ' dari ' + total; },
        viewAllBtn: 'Lihat semua 32 proyek',
        viewCaseStudy: 'Lihat studi kasus →'
      },
      services: {
        eyebrow: 'Layanan',
        headline: 'Tiga hal yang akan saya hadirkan <span class="accent display-italic">untuk tim Anda.</span>',
        cards: [
          {
            title: 'Temukan akar masalah nyata sebelum merancang solusi.',
            desc: 'Saya melakukan wawancara pengguna, usability test, dan analisis kompetitor untuk memastikan kita membangun solusi yang tepat — bukan sekadar yang paling mudah dirumuskan.',
            items: [
              'Wawancara pemangku kepentingan & riset pengguna',
              'Pemetaan persona & alur perjalanan pengguna',
              'Usability testing — Maze, tatap muka, remote',
              'Laporan wawasan yang ringkas dan aplikatif bagi PM'
            ]
          },
          {
            title: 'Desain teruji yang siap dieksekusi dalam sprint.',
            desc: 'Dari wireframe awal hingga prototipe interaktif, saya merancang antarmuka yang bertahan saat diuji pengguna nyata — dan rilis mulus tanpa kendala di QA.',
            items: [
              'Wireframe & prototipe interaktif',
              'UI high-fidelity untuk mobile, web & iPad',
              'Spesifikasi motion & animasi untuk serah-terima dev',
              'Tata letak ramah aksesibilitas (standar WCAG)'
            ]
          },
          {
            title: 'Sistem yang mampu berkembang melampaui sprint pertama.',
            desc: 'Saya membangun sistem desain yang mudah diadopsi tim engineer — terstruktur dalam token, terdokumentasi, dan selaras dengan codebase.',
            items: [
              'Design token — warna, tipografi, spasi, animasi',
              'Pustaka komponen lengkap dengan varian & state',
              'Dokumentasi serah-terima siap-developer',
              'Panduan gaya hidup yang mudah dikembangkan tim'
            ]
          }
        ]
      },
      skills: {
        eyebrow: 'Keahlian & kapabilitas',
        headline: 'Lebih dari sekadar desainer — saya memandu produk dari <span class="accent display-italic">brief hingga peluncuran.</span>',
        desc: 'Banyak tim merekrut desainer lalu kesulitan mengisi celah — siapa yang menulis kebutuhan, siapa yang mengelola sprint, siapa yang menjaga keselarasan pasca-peluncuran? Saya mencakup seluruh alur tersebut. Satu orang, tiga peran, tanpa hambatan komunikasi.',
        pillars: [
          {
            role: 'Peran 01 · Desainer',
            title: 'Seni <em>desain</em> — antarmuka yang siap rilis dan berdaya guna.',
            desc: 'Desain produk menyeluruh dari riset hingga serah-terima. Bagian yang tampak — namun hanyalah permukaan dari apa yang saya kerjakan.',
            items: [
              'Riset pengguna, wawancara & usability testing',
              'Arsitektur informasi & alur pengguna',
              'Wireframe, UI hi-fi, prototipe interaktif',
              'Sistem desain & pustaka komponen',
              'Mobile, web, iPad — desain multi-platform',
              'Spesifikasi motion & dokumentasi serah-terima dev'
            ]
          },
          {
            role: 'Peran 02 · Business Analyst',
            title: 'Sang <em>penerjemah</em> — mengubah brief abstrak menjadi spesifikasi siap bangun.',
            desc: 'Saya menjembatani pemangku kepentingan dan rekayasa, menyusun dokumen kebutuhan, dan memastikan yang dibangun tepat sasaran.',
            items: [
              'Elisitasi kebutuhan & pemangku kepentingan',
              'Pemetaan proses bisnis (BPMN, swimlane)',
              'Kebutuhan fungsional & non-fungsional (FRD/PRD)',
              'Penyusunan use-case & rincian user-story',
              'Analisis kesenjangan & tolok ukur kompetitor',
              'Kriteria penerimaan & skenario UAT'
            ]
          },
          {
            role: 'Peran 03 · Project Driver',
            title: 'Sang <em>konduktor</em> — dari kick-off hingga go-live tanpa kendala.',
            desc: 'Saya memegang alur proyek secara menyeluruh: ruang lingkup, jadwal, ritme sprint, QA, peluncuran — menjaga desain, engineer, dan klien tetap selaras.',
            items: [
              'Penentuan cakupan proyek & perencanaan linimasa',
              'Perencanaan sprint & seremoni agile',
              'Koordinasi tim lintas disiplin',
              'Review QA & fasilitasi UAT',
              'Perencanaan rilis & kesiapan peluncuran',
              'Pemantauan pasca-peluncuran & siklus iterasi'
            ]
          }
        ],
        e2e: ['Brief', 'Kebutuhan', 'Desain', 'Pembangunan', 'QA & UAT', 'Peluncuran']
      },
      process: {
        eyebrow: 'Cara kerja saya',
        headline: 'Transparan dan terstruktur. Proses jelas dari <span class="accent display-italic">kickoff</span> hingga <span class="accent display-italic">serah-terima.</span>',
        steps: [
          { week: 'Minggu 1', title: 'Temukan', desc: 'Wawancara pemangku kepentingan, riset pengguna, analisis kompetitor. Tujuan: memahami masalah sesungguhnya.' },
          { week: 'Minggu 1–2', title: 'Rumuskan', desc: 'Merangkum temuan menjadi tujuan produk yang jelas, alur pengguna, dan tolok ukur keberhasilan.' },
          { week: 'Minggu 2–4', title: 'Rancang', desc: 'Wireframe → high-fidelity → prototipe interaktif. Siklus umpan balik intensif setiap 2-3 hari.' },
          { week: 'Minggu 4–5', title: 'Uji', desc: 'Usability testing dengan 5+ pengguna via Maze atau sesi interaktif. Beriterasi berdasarkan bukti nyata.' },
          { week: 'Minggu 5+', title: 'Serah-Terima', desc: 'Sistem desain ber-token, file Figma siap-dev, spesifikasi animasi, dan pendampingan selama pengembangan.' }
        ],
        note: 'Linimasa fleksibel sesuai cakupan · Ini adalah kolaborasi umum selama 6 minggu.'
      },
      experience: {
        eyebrow: 'Pengalaman',
        headline: 'Dua tahun. Empat perusahaan. <span class="accent display-italic">Satu dedikasi.</span>'
      },
      contact: {
        eyebrow: 'Mari berkolaborasi',
        headline: 'Punya proyek menarik? <span class="accent display-italic">Saya siap mendengarnya.</span>',
        desc: 'Saya membuka penerimaan proyek mulai Q2 2026. Baik Anda sudah memiliki brief lengkap atau baru ide awal, langkah terbaik adalah diskusi singkat 30 menit. Tanpa presentasi rumit. Tanpa komitmen kaku.',
        emailNote: 'Dibalas dalam 24 jam',
        phoneNote: 'WhatsApp lebih disukai · GMT+7',
        loc: 'Jakarta Timur, Indonesia',
        locNote: 'Terbuka untuk remote secara global',
        formTitle: 'Kirim pesan',
        formDesc: 'Saya membaca setiap pesan. Dibalas dalam 24 jam.',
        nameLabel: 'Nama',
        namePlaceholder: 'Nama Anda',
        emailLabel: 'Email',
        emailPlaceholder: 'email@perusahaan.com',
        companyLabel: 'Perusahaan / Proyek',
        companyPlaceholder: 'Opsional',
        typeLabel: 'Jenis proyek',
        typeOptions: ['Aplikasi Mobile', 'Aplikasi Web', 'Sistem Desain', 'Situs Brand', 'Lainnya'],
        budgetLabel: 'Kisaran anggaran',
        budgetOptions: ['Belum pasti', '< $2k', '$2k – $5k', '$5k – $10k', '$10k+'],
        messageLabel: 'Ceritakan proyek Anda',
        messagePlaceholder: 'Apa yang sedang Anda kerjakan? Bagaimana linimasa, kendala, dan konsepnya?',
        submitBtn: 'Kirim pesan',
        waFallback: 'Atau hubungi saya via WhatsApp →'
      },
      footer: {
        tagline: 'Mendesain produk digital yang siap rilis dan berdaya guna. Jakarta Timur · Terbuka untuk remote secara global.',
        sitemap: 'Navigasi',
        now: 'Saat ini',
        nowItems: [
          'Mendesain — LPPOM Digital',
          'Tersedia — Q2 2026',
          'Waktu respons — < 24 jam',
          'GMT+7 · Jakarta Timur'
        ],
        copyright: '© 2026 Hasan Waulat. Didesain & dibangun manual di Jakarta.',
        themeCue: 'Tekan <kbd style="border:1px solid var(--border); padding: 2px 6px; border-radius: 4px;">T</kbd> untuk ganti tema · <a href="#top" style="color: var(--accent); margin-left: 12px;">Ke Atas ↑</a>'
      },
      projectsArchive: {
        back: '← Kembali ke beranda',
        eyebrow: 'Arsip',
        headline: 'Semua proyek, <span class="accent display-italic">di satu tempat.</span>',
        stats: {
          shipped: 'Proyek rilis',
          industries: 'Industri',
          companies: 'Perusahaan',
          prod: 'Beroperasi aktif'
        },
        all: 'Semua',
        viewCaseStudy: 'Lihat studi kasus →',
        noMatch: function (f) { return 'Tidak ada proyek dengan kategori "' + f + '".'; }
      },
      projectDetail: {
        back: '← Semua proyek',
        notFoundTitle: 'Proyek tidak ditemukan',
        notFoundDesc: 'Proyek ini mungkin telah dihapus.',
        backToProjects: 'Kembali ke semua proyek →',
        wantProject: 'Ingin membangun proyek seperti ini untuk tim Anda?',
        moreProjects: 'Proyek lainnya',
        startProject: 'Mulai proyek'
      }
    }
  };

  function updateSwitcherUI(lang) {
    var buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(function (btn) {
      var match = btn.getAttribute('data-lang') === lang;
      if (match) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });
  }

  function applyLanguage(lang) {
    currentLang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    document.documentElement.setAttribute('lang', lang);
    updateSwitcherUI(lang);

    var d = DICT[lang] || DICT.en;

    // Apply to Common Nav links
    var navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.indexOf('#work') !== -1 || href === '#archive') a.textContent = d.nav.work;
      else if (href.indexOf('#about') !== -1) a.textContent = d.nav.about;
      else if (href.indexOf('#skills') !== -1) a.textContent = d.nav.skills;
      else if (href.indexOf('#services') !== -1) a.textContent = d.nav.services;
      else if (href.indexOf('#process') !== -1) a.textContent = d.nav.process;
      else if (href.indexOf('#experience') !== -1) a.textContent = d.nav.experience;
      else if (href.indexOf('#contact') !== -1) a.textContent = d.nav.contact;
      else if (href.indexOf('projects/index.html') !== -1 || href === '/projects' || href === '/projects/') a.textContent = d.nav.allProjects;
    });

    // CV buttons
    var cvButtons = document.querySelectorAll('.nav-actions a[download] span.label, footer a[download]');
    cvButtons.forEach(function (el) {
      el.textContent = d.nav.downloadCv;
    });

    // Back links
    var backHome = document.querySelector('.projects-page .back');
    if (backHome) backHome.textContent = d.projectsArchive.back;

    var backProjects = document.querySelector('.detail .back');
    if (backProjects) backProjects.textContent = d.projectDetail.back;

    // ----- Apply to Homepage from SiteStore (CMS) -----
    if (global.hydrateSite) {
      global.hydrateSite(lang);
    }

    var footHeadings = document.querySelectorAll('footer.foot h5');
    if (footHeadings.length >= 2) {
      footHeadings[0].textContent = d.footer.sitemap;
      footHeadings[1].textContent = d.footer.now;
    }

    var footSitemap = document.querySelectorAll('footer.foot .foot-grid > div:nth-child(2) ul li a');
    if (footSitemap.length >= 7) {
      footSitemap[0].textContent = d.nav.home || (lang === 'id' ? 'Beranda' : 'Home');
      footSitemap[1].textContent = d.nav.work;
      footSitemap[2].textContent = d.nav.about;
      footSitemap[3].textContent = d.nav.services || (lang === 'id' ? 'Proses' : 'Process');
      footSitemap[4].textContent = d.nav.contact;
      footSitemap[5].textContent = d.nav.downloadCv;
      footSitemap[6].textContent = d.nav.allProjects;
    }

    var footNowItems = document.querySelectorAll('footer.foot .foot-grid > div:nth-child(3) ul li');
    footNowItems.forEach(function (li, idx) {
      if (d.footer.nowItems[idx]) li.textContent = d.footer.nowItems[idx];
    });

    var footBottom = document.querySelectorAll('footer.foot .foot-bottom span');
    if (footBottom.length >= 2) {
      footBottom[0].textContent = d.footer.copyright;
      footBottom[1].innerHTML = d.footer.themeCue;
    }

    // Projects archive page
    var projHeadTitle = document.querySelector('.projects-head h1');
    if (projHeadTitle) projHeadTitle.innerHTML = d.projectsArchive.headline;

    var projHeadEyebrow = document.querySelector('.projects-head .eyebrow');
    if (projHeadEyebrow) projHeadEyebrow.textContent = d.projectsArchive.eyebrow;

    var projStatsLabels = document.querySelectorAll('.projects-head .stats div .l');
    if (projStatsLabels.length >= 4) {
      projStatsLabels[0].textContent = d.projectsArchive.stats.shipped;
      projStatsLabels[1].textContent = d.projectsArchive.stats.industries;
      projStatsLabels[2].textContent = d.projectsArchive.stats.companies;
      projStatsLabels[3].textContent = d.projectsArchive.stats.prod;
    }

    // Next CTA in Detail page
    var nextCtaHead = document.querySelector('.detail .next-cta h4');
    if (nextCtaHead) nextCtaHead.textContent = d.projectDetail.wantProject;

    var nextCtaMore = document.querySelector('.detail .next-cta a.btn:not(.btn-primary)');
    if (nextCtaMore) nextCtaMore.textContent = d.projectDetail.moreProjects;

    var nextCtaStart = document.querySelector('.detail .next-cta a.btn-primary');
    if (nextCtaStart) nextCtaStart.textContent = d.projectDetail.startProject;

    // Dispatch event so page-specific dynamic functions (e.g. archive render) can refresh
    global.dispatchEvent(new CustomEvent('hw-lang-changed', { detail: { lang: lang, dict: d } }));
  }

  // Bind click handlers to .lang-btn
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.lang-btn') : null;
    if (!btn) return;
    var targetLang = btn.getAttribute('data-lang');
    if (targetLang && (targetLang === 'id' || targetLang === 'en')) {
      applyLanguage(targetLang);
    }
  });

  // Re-apply on hydrate / cloud change
  global.addEventListener('hw-site-changed', function (e) {
    var targetLang = (e && e.detail && e.detail.lang) || currentLang;
    if (global.hydrateSite) {
      global.hydrateSite(targetLang);
    }
  });

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { applyLanguage(currentLang); });
  } else {
    applyLanguage(currentLang);
  }

  global.I18N = {
    getLang: function () { return currentLang; },
    setLang: applyLanguage,
    dict: DICT
  };
})(window);
