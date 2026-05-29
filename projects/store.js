/* ============================================================
   Shared Project Store — used by home archive, projects list,
   detail page, and admin CMS. Reads from localStorage if any
   custom data exists; otherwise falls back to seed data.

   Storage key: "hw_projects_v1"
   ============================================================ */
(function (global) {
  'use strict';

  const STORAGE_KEY = 'hw_projects_v1';

  /* ---------- Seed data ---------- */
  const SEED = [
    {
      id: 'lppom-digital', n: '01', y: '2025',
      t: 'LPPOM Digital Platform',
      headline: 'Digitizing halal certification for 270M Indonesians.',
      c: 'PT. Ragdalion · Government',
      industry: 'Government',
      client: 'PT. Ragdalion Revolusi Industry',
      role: 'Lead UI/UX Designer',
      team: 'PM, 4 engineers, QA',
      surfaces: 'Mobile · Web Admin · iPad',
      timeline: '4 months',
      d: 'Integrated halal certification platform spanning mobile, web admin, and iPad inspection app.',
      lead: 'LPPOM MUI is the institute behind every halal-certified product in Indonesia. Their certification process — used by tens of thousands of food, drug, and cosmetics businesses — was paper-bound, opaque, and slow.',
      tags: ['mobile', 'ipad', 'web', 'government', 'design-system'],
      display: ['Mobile', 'iPad', 'Web Admin', 'Government'],
      chips: ['Featured', 'Multi-surface'],
      cover: 'LPPOM Digital',
      coverImage: '',
      featured: true,
      featuredOrder: 1,
      sections: [
        { type: 'paragraph', heading: 'The brief', body: 'I led the design of an integrated digital platform spanning mobile (for businesses), web admin (for auditors), and iPad (for on-site inspections).' },
        { type: 'list', heading: 'What I owned', items: ['Stakeholder discovery across LPPOM MUI staff and partner businesses', 'Information architecture across 3 surfaces', 'High-fidelity UI for mobile, web admin, and iPad', 'Cross-platform design system from scratch', 'Developer handoff and pairing during build'] },
        { type: 'paragraph', heading: 'Outcome', body: 'A multi-month bureaucratic process turned into a transparent, trackable workflow. Three surfaces shipped on a unified system in four months.' }
      ],
      gallery: []
    },
    {
      id: 'lppom-docs', n: '02', y: '2025',
      t: 'LPPOM Documentation API',
      headline: 'A docs site developers don\u2019t curse at.',
      c: 'PT. Ragdalion · DevEx',
      industry: 'Developer Experience',
      client: 'PT. Ragdalion Revolusi Industry',
      role: 'UI/UX Designer',
      team: 'PM, 2 engineers',
      surfaces: 'Web',
      timeline: '6 weeks',
      d: 'API documentation portal designed for partners and integrators.',
      lead: 'API documentation portal designed for partners and integrators — endpoint-first, searchable, with copy-paste examples that just work.',
      tags: ['web', 'design-system'],
      display: ['Web', 'Docs'],
      chips: ['Web', 'Docs'],
      cover: 'Docs API', coverImage: '',
      featured: true, featuredOrder: 2,
      sections: [
        { type: 'paragraph', heading: 'The brief', body: 'Co-designed with engineering so every code sample reflects real implementation.' },
        { type: 'list', heading: 'What I owned', items: ['Information architecture for 12 endpoints', 'Search-first navigation pattern', 'Live request playground UI', 'Code sample component design'] },
        { type: 'paragraph', heading: 'Outcome', body: 'A docs portal partners actually reference. Zero "where do I find…" support tickets in the first month post-launch.' }
      ],
      gallery: []
    },
    {
      id: 'attendance', n: '03', y: '2024',
      t: 'HR Attendance System',
      headline: 'Replacing fingerprint scanners with a phone in your pocket.',
      c: 'Internal · HR-Tech', industry: 'HR-Tech', client: 'Internal',
      role: 'UI/UX Designer', team: 'PM, 3 engineers', surfaces: 'Mobile · Web Admin', timeline: '3 months',
      d: 'Facial recognition + GPS + QR check-in with payroll integration.',
      lead: 'A complete HR attendance platform combining facial recognition, GPS verification, QR check-in, and payroll integration.',
      tags: ['mobile', 'web', 'hr-tech'],
      display: ['Mobile', 'Web', 'HR'],
      chips: ['Mobile', 'Dashboard'],
      cover: 'Attendance System', coverImage: '',
      featured: true, featuredOrder: 3,
      sections: [
        { type: 'paragraph', heading: 'The brief', body: 'Designed for HR teams who needed real-time visibility without becoming surveillance — and for employees who deserved a tool that doesn\u2019t waste their time.' },
        { type: 'list', heading: 'What I owned', items: ['5 attendance methods integrated into a single flow', 'Real-time analytics dashboard', 'Payroll system integration UX', 'Privacy-conscious face-recognition flow'] },
        { type: 'paragraph', heading: 'Outcome', body: 'Active across the organization. Average check-in time reduced from 22s to 4s.' }
      ],
      gallery: []
    },
    {
      id: 'logistics', n: '04', y: '2024',
      t: 'Logistics Company Profile',
      headline: 'A logistics website that closes deals before sales calls do.',
      c: 'Confidential · Logistics', industry: 'Logistics', client: 'Confidential',
      role: 'UI/UX Designer', team: 'PM, 1 engineer', surfaces: 'Web', timeline: '4 weeks',
      d: 'B2B marketing site engineered as a sales tool, not a brochure.',
      lead: 'A company profile site designed not as a brochure but as a sales tool. Information architecture built around the questions B2B prospects actually ask.',
      tags: ['web'], display: ['Web', 'B2B'], chips: ['Marketing', 'B2B'],
      cover: 'Logistics Co.', coverImage: '',
      featured: true, featuredOrder: 4,
      sections: [
        { type: 'paragraph', heading: 'The brief', body: 'Every CTA, every service page, every case study — engineered to move serious buyers toward a meeting.' },
        { type: 'list', heading: 'What I owned', items: ['8 service pages with conversion-first IA', 'Lead-gen forms integrated', 'Partner showcase module'] },
        { type: 'paragraph', heading: 'Outcome', body: 'Live and converting. Marketing reports a measurable lift in qualified inbound leads.' }
      ],
      gallery: []
    },
    {
      id: 'jdih', n: '05', y: '2024',
      t: 'JDIH Kemenkeu Redesign',
      headline: 'Making Indonesian financial law actually findable.',
      c: 'Kementerian Keuangan · Government', industry: 'Government', client: 'Kementerian Keuangan',
      role: 'UI/UX Designer', team: 'PM, internal Kemenkeu team', surfaces: 'Mobile', timeline: '6 weeks',
      d: 'Redesigning Indonesia\u2019s financial regulations app from search up.',
      lead: 'JDIH is the Ministry of Finance\u2019s official database of every financial regulation, decree, and law in Indonesia. The original mobile app worked — barely.',
      tags: ['mobile', 'government'], display: ['Mobile', 'Gov'], chips: ['Government', 'A11y'],
      cover: 'JDIH Kemenkeu', coverImage: '',
      featured: true, featuredOrder: 5,
      sections: [
        { type: 'paragraph', heading: 'The brief', body: 'Redesigned from the search experience up, treating legal professionals and curious citizens as equally important users.' },
        { type: 'list', heading: 'What I owned', items: ['Improved search architecture', 'Restructured document hierarchy', 'Accessibility improvements (WCAG-aware)', 'Reading-experience rework for dense legal text'] },
        { type: 'paragraph', heading: 'Outcome', body: 'Findability and readability dramatically improved. Legal professionals report spending less time hunting for documents.' }
      ],
      gallery: []
    },
    // The other 27 — keep light (just card data, no detail sections)
    ...[
      ['payroll', '06', '2024', 'HR Payroll Integration', 'Internal · HR-Tech · Web', ['web', 'hr-tech'], ['Web', 'HR'], ['Integration']],
      ['inspection', '07', '2024', 'Inspection iPad App', 'PT. Ragdalion · Field Ops · iPad', ['ipad'], ['iPad'], ['Tablet']],
      ['auditor', '08', '2024', 'Auditor Web Console', 'PT. Ragdalion · Internal Tools · Web', ['web'], ['Web', 'Admin'], ['Admin']],
      ['eduwork', '09', '2024', 'Eduwork Course Flow', 'Eduwork · Edu-Tech · Web', ['web', 'edu-tech'], ['Web', 'EdTech'], ['EdTech']],
      ['digimarly', '10', '2024', 'Digimarly Client Site', 'Digimarly · Marketing · Web', ['web'], ['Web'], ['Web']],
      ['azura', '11', '2024', 'Azura Product Sprint', 'Azura Labs · Internal · Mobile', ['mobile'], ['Mobile'], ['Sprint']],
      ['binar', '12', '2023', 'Binar Academy Capstone', 'Binar Academy · Edu-Tech · Mobile', ['mobile', 'edu-tech'], ['Mobile', 'EdTech'], ['Capstone']],
      ['ragdalion-ds', '13', '2025', 'Ragdalion Design System', 'PT. Ragdalion · Internal', ['design-system', 'web', 'mobile'], ['Design System'], ['DS']],
      ['lppom-mobile', '14', '2025', 'LPPOM Business Mobile', 'PT. Ragdalion · Government', ['mobile', 'government'], ['Mobile', 'Gov'], ['Mobile']],
      ['lppom-admin', '15', '2025', 'LPPOM Web Admin', 'PT. Ragdalion · Government', ['web', 'government'], ['Web', 'Gov'], ['Web']],
      ['jdih-search', '16', '2024', 'JDIH Search Redesign', 'Kementerian Keuangan · Government', ['mobile', 'government'], ['Mobile', 'Search'], ['Search']],
      ['attendance-dash', '17', '2024', 'Attendance Dashboard', 'Internal · HR-Tech', ['web', 'hr-tech'], ['Web', 'Dashboard'], ['Dashboard']],
      ['leave', '18', '2024', 'Leave Request Flow', 'Internal · HR-Tech', ['mobile', 'hr-tech'], ['Mobile', 'HR'], ['HR']],
      ['partner', '19', '2024', 'Partner Onboarding Web', 'Confidential · Logistics', ['web'], ['Web', 'B2B'], ['B2B']],
      ['shipment', '20', '2024', 'Shipment Tracker UI', 'Confidential · Logistics', ['web', 'mobile'], ['Web', 'Mobile'], ['Tracking']],
      ['eduwork-dash', '21', '2024', 'Eduwork Student Dashboard', 'Eduwork · Edu-Tech', ['web', 'edu-tech'], ['Web', 'EdTech'], ['Dashboard']],
      ['digimarly-cms', '22', '2024', 'Digimarly CMS Concept', 'Digimarly · Internal', ['web'], ['Web', 'CMS'], ['CMS']],
      ['azura-mobile', '23', '2024', 'Azura Mobile Brief', 'Azura Labs · Internal', ['mobile'], ['Mobile'], ['Mobile']],
      ['azura-dash', '24', '2024', 'Azura Web Dashboard', 'Azura Labs · Internal', ['web'], ['Web'], ['Web']],
      ['binar-research', '25', '2023', 'Binar Research Sprint', 'Binar Academy · Edu-Tech', ['mobile', 'edu-tech'], ['Research'], ['Research']],
      ['binar-ux', '26', '2023', 'Binar UX Wireframes', 'Binar Academy · Edu-Tech', ['mobile', 'edu-tech'], ['Wireframes'], ['Wireframes']],
      ['binar-proto', '27', '2023', 'Binar Prototype Build', 'Binar Academy · Edu-Tech', ['mobile', 'edu-tech'], ['Prototype'], ['Prototype']],
      ['binar-ds', '28', '2023', 'Binar Mini Design System', 'Binar Academy · Edu-Tech', ['design-system', 'edu-tech'], ['Design System'], ['DS']],
      ['concept-fintech', '29', '2024', 'Fintech Concept Study', 'Side Project · Fintech', ['mobile'], ['Concept', 'Fintech'], ['Concept']],
      ['concept-health', '30', '2024', 'Health Tracker Concept', 'Side Project · Health', ['mobile'], ['Concept', 'Health'], ['Concept']],
      ['concept-pos', '31', '2024', 'F&B POS Concept', 'Side Project · F&B', ['ipad'], ['iPad', 'POS'], ['POS']],
      ['concept-portfolio', '32', '2026', 'This Portfolio Site', 'Self · Branding', ['web'], ['Web', 'Brand'], ['Brand']]
    ].map(([id, n, y, t, meta, tags, display, chips]) => ({
      id, n, y, t,
      headline: t,
      c: meta,
      industry: meta.split('·')[1]?.trim() || 'Design',
      client: meta.split('·')[0].trim(),
      role: 'UI/UX Designer',
      team: 'Cross-functional team',
      surfaces: display.join(' · '),
      timeline: '4–8 weeks',
      d: 'A shipped product I had hands on. Detailed write-up available on request.',
      lead: 'A shipped product I had hands on. Detailed write-up available on request.',
      tags, display, chips,
      cover: t, coverImage: '',
      featured: false,
      sections: [
        { type: 'paragraph', heading: 'The brief', body: 'Detailed brief and write-up shared upon request via the contact form on the home page.' },
        { type: 'list', heading: 'What I owned', items: ['End-to-end UI/UX', 'Stakeholder interviews', 'Hi-fi design and prototype', 'Developer handoff'] },
        { type: 'paragraph', heading: 'Outcome', body: 'Shipped. Used in production. Happy team.' }
      ],
      gallery: []
    }))
  ];

  /* ---------- Storage ---------- */
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(SEED);
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
      return clone(SEED);
    } catch (e) {
      console.warn('ProjectStore: load failed', e);
      return clone(SEED);
    }
  }

  function save(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('hw-projects-changed'));
      return { ok: true };
    } catch (e) {
      console.error('ProjectStore: save failed', e);
      return { ok: false, error: e.message || 'Storage quota exceeded — try removing some images.' };
    }
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('hw-projects-changed'));
  }

  function get(id) {
    return load().find(p => p.id === id);
  }

  function upsert(item) {
    const list = load();
    const idx = list.findIndex(p => p.id === item.id);
    if (idx >= 0) list[idx] = item;
    else list.push(item);
    return save(list);
  }

  function remove(id) {
    const list = load().filter(p => p.id !== id);
    return save(list);
  }

  function reorder(ids) {
    const list = load();
    const map = new Map(list.map(p => [p.id, p]));
    const next = ids.map(id => map.get(id)).filter(Boolean);
    // append any not in the order list at the end
    list.forEach(p => { if (!ids.includes(p.id)) next.push(p); });
    return save(next);
  }

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  /* ---------- Image utilities ---------- */
  // Resize/compress an uploaded image File → returns dataURL (jpeg, max 1600px wide)
  function fileToCompressedDataURL(file, maxWidth = 1600, quality = 0.82) {
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
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          try {
            const out = canvas.toDataURL('image/jpeg', quality);
            resolve(out);
          } catch (e) { reject(e); }
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  /* ---------- Export / import ---------- */
  function exportJSON() {
    const data = JSON.stringify(load(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hasan-projects-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }
  function importJSON(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => {
        try {
          const data = JSON.parse(r.result);
          if (!Array.isArray(data)) throw new Error('Invalid format');
          save(data);
          resolve(data);
        } catch (e) { reject(e); }
      };
      r.onerror = reject;
      r.readAsText(file);
    });
  }

  /* ---------- Helpers for views ---------- */
  function featured() {
    return load().filter(p => p.featured)
      .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));
  }

  function blank() {
    return {
      id: 'project-' + Math.random().toString(36).slice(2, 7),
      n: String(load().length + 1).padStart(2, '0'),
      y: String(new Date().getFullYear()),
      t: 'New Project',
      headline: 'New Project',
      c: 'Client · Industry',
      industry: 'Industry',
      client: 'Client',
      role: 'UI/UX Designer',
      team: 'Cross-functional team',
      surfaces: 'Web',
      timeline: '4 weeks',
      d: 'Short description.',
      lead: 'Longer lead paragraph for the detail page.',
      tags: ['web'],
      display: ['Web'],
      chips: ['New'],
      cover: 'New Project',
      coverImage: '',
      featured: false,
      sections: [
        { type: 'paragraph', heading: 'The brief', body: '' },
        { type: 'list', heading: 'What I owned', items: [''] },
        { type: 'paragraph', heading: 'Outcome', body: '' }
      ],
      gallery: []
    };
  }

  global.ProjectStore = {
    SEED, load, save, reset, get, upsert, remove, reorder,
    fileToCompressedDataURL, exportJSON, importJSON,
    featured, blank
  };
})(window);
