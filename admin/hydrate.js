/* ============================================================
   Site Hydration — pulls data from SiteStore and patches the
   static HTML on page load. If no custom data is stored, the
   default content (which matches the static markup) is applied
   as a no-op overlay.

   Loaded by index.html.
   ============================================================ */
(function () {
  'use strict';
  if (!window.SiteStore) { console.warn('Hydrate: SiteStore not loaded'); return; }

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function setHTML(sel, html) { const el = $(sel); if (el != null && html != null) el.innerHTML = html; }
  function setText(sel, text) { const el = $(sel); if (el != null && text != null) el.textContent = text; }
  function setAttr(sel, attr, val) { const el = $(sel); if (el != null && val != null) el.setAttribute(attr, val); }

  function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])); }
  // Allow a small whitelist of inline HTML in fields (italics for accent words, strong, br)
  function richSafe(s) { return String(s ?? ''); } // Trust admin input — same origin

  function hydrate(data) {
    /* ====== Header ====== */
    const h = data.header;
    if (h) {
      // Brand block
      const brandSpan = $('.nav-brand > span');
      if (brandSpan) brandSpan.innerHTML = `${esc(h.brandName)}<span style="color: var(--muted); margin-left: 8px;">— ${esc(h.brandTitle)}</span>`;
      const mark = $('.nav-brand .mark');
      if (mark) mark.textContent = h.brandInitial || 'h';
      // CV button
      $$('a[href$="Hasan-Waulat-CV.pdf"], a[href*="cv/"]').forEach(a => {
        if (h.cvPath) a.setAttribute('href', h.cvPath);
      });
      // WA button (the one with btn-primary in nav)
      const waLink = $('.nav-actions a.btn-primary');
      if (waLink && h.waNumber) {
        const url = 'https://wa.me/' + encodeURIComponent(h.waNumber);
        const withText = h.waMessage ? url + '?text=' + encodeURIComponent(h.waMessage) : url;
        waLink.setAttribute('href', withText);
      }
    }

    /* ====== Hero ====== */
    const hero = data.hero;
    if (hero) {
      // Eyebrow
      const eyebrow = $('.hero .eyebrow');
      if (eyebrow) eyebrow.textContent = hero.eyebrow;
      // Headline — replace #heroWords with formatted lines
      const headlineEl = $('#heroWords');
      if (headlineEl && hero.headlineLines) {
        const lines = hero.headlineLines.map(line =>
          // Each word becomes a .w span for the stagger animation
          line.replace(/<em>(.*?)<\/em>/g, '<EM>$1</EM>')
              .split(/(\s+)/)
              .map(part => {
                if (/^\s+$/.test(part)) return ' ';
                if (part === '') return '';
                const m = part.match(/^<EM>(.*?)<\/EM>([^<]*)$/);
                if (m) return `<span class="w accent display-italic">${esc(m[1])}</span>${esc(m[2])}`;
                return `<span class="w">${esc(part)}</span>`;
              }).join('')
        ).join('<br/>');
        headlineEl.innerHTML = lines;
        // Re-animate
        const ws = headlineEl.querySelectorAll('.w');
        ws.forEach((w, i) => { w.style.transitionDelay = (200 + i * 70) + 'ms'; });
        requestAnimationFrame(() => headlineEl.classList.add('in'));
      }
      // Subhead
      const sub = $('.hero-sub');
      if (sub) sub.innerHTML = hero.sub;
      // CTAs — three of them in order
      const ctas = $$('.hero-cta a.btn');
      if (ctas[0]) { ctas[0].setAttribute('href', hero.ctaPrimaryHref); ctas[0].childNodes[0].nodeValue = hero.ctaPrimary + '\n            '; }
      if (ctas[1]) { ctas[1].setAttribute('href', hero.ctaSecondaryHref); ctas[1].childNodes[0].nodeValue = hero.ctaSecondaryText + '\n            '; }
      if (ctas[2]) { ctas[2].setAttribute('href', hero.ctaTertiaryHref); ctas[2].textContent = hero.ctaTertiaryText; }
      // Trust strip
      const trust = $('.hero-trust');
      if (trust && hero.trust) {
        trust.innerHTML = hero.trust.map(t => `<span>${esc(t).replace(/ /g, '&nbsp;')}</span>`).join('');
      }
      // Now badge
      const now = $('.hero-visual .now');
      if (now) now.innerHTML = `<span class="pulse"></span> ${esc(hero.nowBadge)}`;
      // Photo
      const photo = $('.hero-photo');
      if (photo && hero.photo) photo.setAttribute('src', hero.photo);
      // Scroll cue
      const cue = $('.scroll-cue');
      if (cue) cue.innerHTML = `<span>${esc(hero.scrollCue)}</span><span class="arrow">↓</span>`;
    }

    /* ====== Metrics ====== */
    if (data.metrics) {
      const metricEls = $$('.metrics .metric');
      data.metrics.forEach((m, i) => {
        const el = metricEls[i]; if (!el) return;
        const numEl = el.querySelector('.num');
        const counter = numEl.querySelector('.counter');
        if (counter) counter.dataset.to = String(m.value);
        // Update suffix span if present
        let sup = numEl.querySelector('.sup');
        if (m.suffix) {
          if (!sup) {
            sup = document.createElement('span');
            sup.className = 'sup';
            numEl.appendChild(sup);
          }
          sup.textContent = m.suffix;
        } else if (sup) sup.remove();
        const label = el.querySelector('.label');
        if (label) label.textContent = m.label;
      });
    }

    /* ====== About ====== */
    const ab = data.about;
    if (ab) {
      const sec = $('#about');
      if (sec) {
        const eyebrow = sec.querySelector('.eyebrow'); if (eyebrow) eyebrow.textContent = ab.eyebrow;
        const h2 = sec.querySelector('.head h2');
        if (h2 && ab.headline) h2.innerHTML = ab.headline.replace(/<em>(.*?)<\/em>/g, '<span class="accent display-italic">$1</span>');
        const bio = sec.querySelector('.about-bio');
        if (bio && ab.paragraphs) {
          const downloadLink = bio.querySelector('.download');
          bio.innerHTML = ab.paragraphs.map(p => `<p>${p}</p>`).join('');
          if (downloadLink) bio.appendChild(downloadLink);
          const dl = bio.querySelector('.download');
          if (dl && ab.ctaText) dl.textContent = ab.ctaText;
        }
        const card = sec.querySelector('.now-card');
        if (card && ab.nowCard) {
          const title = card.querySelector('.title');
          card.innerHTML = '';
          if (title) card.appendChild(title);
          ab.nowCard.forEach(row => {
            const div = document.createElement('div');
            div.className = 'row';
            div.innerHTML = `<div class="k">${esc(row.k)}</div><div class="v">${row.v}</div>`;
            card.appendChild(div);
          });
        }
      }
    }

    /* ====== Customers logo marquee ====== */
    if (data.customers) {
      const track = $('.customers .logo-track');
      if (track) {
        // Build two passes for seamless loop
        const html = (list) => list.map(c => `<span class="logo-item"><span class="glyph">${esc(c.initial)}</span>${esc(c.name).replace(/ /g, '&nbsp;')}</span><span class="sep"></span>`).join('');
        track.innerHTML = html(data.customers) + html(data.customers);
      }
    }

    /* ====== Skills ====== */
    const sk = data.skills;
    if (sk) {
      const sec = $('#skills');
      if (sec) {
        const eyebrow = sec.querySelector('.eyebrow'); if (eyebrow) eyebrow.textContent = sk.eyebrow;
        const h2 = sec.querySelector('.head h2'); if (h2 && sk.headline) h2.innerHTML = sk.headline.replace(/<em>(.*?)<\/em>/g, '<span class="accent display-italic">$1</span>');
        const desc = sec.querySelector('.head .desc'); if (desc && sk.desc) desc.textContent = sk.desc;
        const pillarsEl = sec.querySelector('.pillars');
        if (pillarsEl && sk.pillars) {
          pillarsEl.innerHTML = sk.pillars.map(p => `
            <article class="pillar">
              <span class="role-tag"><span class="dot"></span> ${esc(p.role)}</span>
              <h3>${(p.title || '').replace(/<em>(.*?)<\/em>/g, '<em>$1</em>')}</h3>
              <p>${p.desc || ''}</p>
              <ul class="skills-list">${(p.items || []).map(i => `<li>${i}</li>`).join('')}</ul>
              <div class="stack">${(p.stack || []).map(s => `<span>${esc(s)}</span>`).join('')}</div>
            </article>
          `).join('');
        }
        const e2eEl = sec.querySelector('.e2e');
        if (e2eEl && sk.e2e) {
          e2eEl.innerHTML = sk.e2e.map(s => `<div class="step"><div class="num">${esc(s.n)}</div><div class="label">${esc(s.label)}</div><div class="role">${esc(s.role)}</div></div>`).join('');
        }
      }
    }

    /* ====== Services ====== */
    const sv = data.services;
    if (sv) {
      const sec = $('#services');
      if (sec) {
        const eyebrow = sec.querySelector('.eyebrow'); if (eyebrow) eyebrow.textContent = sv.eyebrow;
        const h2 = sec.querySelector('.head h2'); if (h2 && sv.headline) h2.innerHTML = sv.headline.replace(/<em>(.*?)<\/em>/g, '<span class="accent display-italic">$1</span>');
        const list = sec.querySelector('.services-list');
        if (list && sv.cards) {
          list.innerHTML = sv.cards.map(c => `
            <article class="service">
              <div class="num">${esc(c.num)}</div>
              <h3>${esc(c.title)}</h3>
              <p>${c.desc || ''}</p>
              <ul>${(c.items || []).map(i => `<li>${i}</li>`).join('')}</ul>
              <div class="tools">${esc(c.tools)}</div>
            </article>
          `).join('');
        }
      }
    }

    /* ====== Process ====== */
    const pr = data.process;
    if (pr) {
      const sec = $('#process');
      if (sec) {
        const eyebrow = sec.querySelector('.eyebrow'); if (eyebrow) eyebrow.textContent = pr.eyebrow;
        const h2 = sec.querySelector('.head h2'); if (h2 && pr.headline) h2.innerHTML = pr.headline.replace(/<em>(.*?)<\/em>/g, '<span class="accent display-italic">$1</span>');
        const track = sec.querySelector('.process-track');
        if (track && pr.steps) {
          track.innerHTML = pr.steps.map(s => `<div class="process-step"><div class="n">${esc(s.n)}</div><div class="week">${esc(s.week)}</div><h4>${esc(s.title)}</h4><p>${s.desc || ''}</p></div>`).join('');
        }
        const note = sec.querySelector('p[style*="Geist Mono"], p[style*="JetBrains"]');
        if (note && pr.note) note.textContent = pr.note;
      }
    }

    /* ====== Experience ====== */
    const ex = data.experience;
    if (ex) {
      const sec = $('#experience');
      if (sec) {
        const eyebrow = sec.querySelector('.eyebrow'); if (eyebrow) eyebrow.textContent = ex.eyebrow;
        const h2 = sec.querySelector('.head h2'); if (h2 && ex.headline) h2.innerHTML = ex.headline.replace(/<em>(.*?)<\/em>/g, '<span class="accent display-italic">$1</span>');
        
        const roadmap = sec.querySelector('.roadmap');
        if (roadmap && ex.items && ex.items.length) {
          const PIN_PALETTES = [
            { color: '#EF4444', start: '#FF5A5F', end: '#C81E1E' }, // Red (Origin)
            { color: '#F97316', start: '#FB923C', end: '#C2410C' }, // Orange
            { color: '#10B981', start: '#34D399', end: '#047857' }, // Green
            { color: '#0EA5E9', start: '#38BDF8', end: '#0369A1' }, // Sky Blue
            { color: '#8B5CF6', start: '#A78BFA', end: '#6D28D9' }, // Purple
            { color: '#F43F5E', start: '#FB7185', end: '#BE123C' }, // Rose
            { color: '#F59E0B', start: '#FBBF24', end: '#B45309' }, // Amber
            { color: '#10B981', start: '#34D399', end: '#059669' }, // Emerald / Now
            { color: '#06B6D4', start: '#22D3EE', end: '#0891B2' }, // Cyan
            { color: '#6366F1', start: '#818CF8', end: '#4338CA' }  // Indigo
          ];

          // Items in CMS are [Newest (most recent) ... Oldest].
          // Road map displays [Oldest (Origin: 1) ... Newest (Now: N)]
          const chronItems = ex.items.slice().reverse();
          const totalCount = chronItems.length;
          const totalHeight = 160 + (totalCount - 1) * 330 + 280;
          roadmap.style.height = totalHeight + 'px';

          // Update SVG curves to match item count
          const roadSvg = roadmap.querySelector('.road-svg');
          if (roadSvg) {
            roadSvg.setAttribute('viewBox', `0 0 1000 ${totalHeight}`);

            let dRoad = 'M 500 0';
            for (let i = 0; i < totalCount; i++) {
              const top = 160 + i * 330;
              const prevTop = i === 0 ? 0 : 160 + (i - 1) * 330;
              const px = (i % 2 === 0) ? (i === 0 ? 420 : 320) : 680;
              const prevX = i === 0 ? 500 : ((i - 1) % 2 === 0 ? (i - 1 === 0 ? 420 : 320) : 680);
              if (i === 0) {
                dRoad += ' C 500 60, 420 100, 420 160';
              } else {
                dRoad += ` C ${prevX} ${prevTop + 150}, ${px} ${top - 150}, ${px} ${top}`;
              }
            }
            const lastI = totalCount - 1;
            const lastTop = 160 + lastI * 330;
            const lastX = (lastI % 2 === 0) ? (lastI === 0 ? 420 : 320) : 680;
            dRoad += ` C ${lastX} ${lastTop + 130}, 500 ${totalHeight - 80}, 500 ${totalHeight}`;

            const roadPaths = roadSvg.querySelectorAll('.road-path-shadow, .road-path-extrusion, .road-path-kerb, .road-path-asphalt, .road-path-dashes');
            roadPaths.forEach(p => p.setAttribute('d', dRoad));

            const river = roadSvg.querySelector('.map-river');
            if (river) {
              let riverD = 'M 880 0 C 820 200, 950 400, 850 650 S 720 900, 800 1200 S 920 1500, 840 1800 S 700 2100, 780 2400';
              if (totalHeight > 2400) {
                riverD += ` S 860 ${Math.round(2400 + (totalHeight - 2400) * 0.45)}, 780 ${totalHeight}`;
              }
              river.setAttribute('d', riverD);
            }
          }

          // Clear old milestone DOM elements
          roadmap.querySelectorAll('.road-milestone').forEach(el => el.remove());

          // Build dynamic milestones
          const milestonesHtml = chronItems.map((it, idx) => {
            const num = idx + 1;
            const top = 160 + idx * 330;
            const side = (idx % 2 === 0) ? 'right' : 'left';
            const pinX = (idx % 2 === 0) ? (idx === 0 ? 42 : 32) : 68;
            const pal = it.now
              ? { color: '#10B981', start: '#34D399', end: '#059669' }
              : (PIN_PALETTES[idx % PIN_PALETTES.length]);

            const isOrigin = (idx === 0);
            const badgeHtml = isOrigin
              ? '<div class="road-card-badge origin">Origin</div>'
              : (it.now ? '<div class="road-card-badge">Now</div>' : '');

            const bulletsHtml = (it.bullets && it.bullets.length)
              ? `<ul>${it.bullets.map(b => {
                  const cleanB = String(b || '').replace(/^[•●\-\*]\s*/, '').trim();
                  return cleanB ? `<li>${esc(cleanB)}</li>` : '';
                }).filter(Boolean).join('')}</ul>`
              : '';

            const descHtml = it.desc ? `<p>${esc(it.desc)}</p>` : '';

            return `
              <div class="road-milestone ms-${num} reveal in" data-side="${side}" style="top: ${top}px; --pin-x: ${pinX}%; --pin-color: ${pal.color}; --pin-start: ${pal.start}; --pin-end: ${pal.end};">
                <div class="road-pin" title="${isOrigin ? 'Origin: ' : (it.now ? 'Current: ' : '')}${esc(it.org)}">
                  <svg class="pin-svg" viewBox="0 0 54 70" width="48" height="62" aria-hidden="true">
                    <defs>
                      <radialGradient id="pSh_dyn_${num}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(0,0,0,0.55)"/><stop offset="100%" stop-color="rgba(0,0,0,0)"/></radialGradient>
                      <linearGradient id="pGr_dyn_${num}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${pal.start}"/><stop offset="100%" stop-color="${pal.end}"/></linearGradient>
                      <linearGradient id="pGl_dyn_${num}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.8"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
                    </defs>
                    <ellipse cx="27" cy="66" rx="14" ry="4" fill="url(#pSh_dyn_${num})"/>
                    <path d="M27 64 C27 64 6 40 6 24 C6 12 15.5 3 27 3 C38.5 3 48 12 48 24 C48 40 27 64 27 64 Z" fill="url(#pGr_dyn_${num})"/>
                    <circle cx="27" cy="24" r="13.5" fill="#FFFFFF"/>
                    <text x="27" y="30" text-anchor="middle" font-family="'Geist', system-ui, sans-serif" font-weight="800" font-size="15" fill="#1C1D22">${num}</text>
                    <path d="M14 16 C16 9 22 6 27 6 C24 8 20 12 19 16 Z" fill="url(#pGl_dyn_${num})"/>
                  </svg>
                </div>
                <div class="road-connector"></div>
                <div class="road-card">
                  ${badgeHtml}
                  <div class="road-when">${esc(it.when)}</div>
                  <h4>${esc(it.title)}</h4>
                  <div class="road-org">${esc(it.org)}</div>
                  ${descHtml}
                  ${bulletsHtml}
                </div>
              </div>
            `;
          }).join('');

          roadmap.insertAdjacentHTML('beforeend', milestonesHtml);

          if (window._revealObserver) {
            roadmap.querySelectorAll('.reveal').forEach(el => window._revealObserver.observe(el));
          }
        } else {
          const tl = sec.querySelector('.timeline');
          if (tl && ex.items) {
            tl.innerHTML = ex.items.map((it, i) => {
              const odd = i % 2 === 0;
              const card = `<div class="tl-card">
                <div class="when">${esc(it.when)}</div>
                <h4>${esc(it.title)}</h4>
                <div class="org">${esc(it.org)}</div>
                <p>${it.desc || ''}</p>
                ${(it.bullets && it.bullets.length) ? `<ul>${it.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
              </div>`;
              const spacer = '<div class="tl-spacer"></div>';
              return `<div class="tl-item${it.now ? ' is-now' : ''}"><div class="node"></div>${odd ? card + spacer : spacer + card}</div>`;
            }).join('');
          }
        }
      }
    }

    /* ====== Testimonials ====== */
    const tm = data.testimonials;
    if (tm) {
      const sec = $('#testimonials');
      if (sec) {
        const eyebrow = sec.querySelector('.eyebrow'); if (eyebrow) eyebrow.textContent = tm.eyebrow;
        const h2 = sec.querySelector('.head h2'); if (h2 && tm.headline) h2.innerHTML = tm.headline.replace(/<em>(.*?)<\/em>/g, '<span class="accent display-italic">$1</span>');
        const list = sec.querySelector('.testimonials');
        if (list && tm.items) {
          list.innerHTML = tm.items.map(t => `<div class="t-card"><p class="quote">${esc(t.quote)}</p><div class="who"><div class="avatar">${esc(t.initial || (t.name || '?').charAt(0))}</div><div class="meta"><div class="n">${esc(t.name)}</div><div class="r">${esc(t.role)}</div></div></div></div>`).join('');
        }
      }
    }

    /* ====== Contact ====== */
    const ct = data.contact;
    if (ct) {
      const sec = $('#contact');
      if (sec) {
        const eyebrow = sec.querySelector('.eyebrow'); if (eyebrow) eyebrow.textContent = ct.eyebrow;
        const h2 = sec.querySelector('.contact-grid h2'); if (h2 && ct.headline) h2.innerHTML = ct.headline.replace(/<em>(.*?)<\/em>/g, '<span class="accent display-italic">$1</span>');
        const intro = sec.querySelector('.contact-grid > div > p[class*="reveal"]');
        if (intro && ct.desc) intro.textContent = ct.desc;
        const rows = sec.querySelectorAll('.contact-info .row .v');
        if (rows[0] && ct.email) rows[0].innerHTML = `${esc(ct.email)}<small>${esc(ct.emailNote)}</small>`;
        if (rows[1] && ct.phone) rows[1].innerHTML = `${esc(ct.phone)}<small>${esc(ct.phoneNote)}</small>`;
        if (rows[2] && ct.location) rows[2].innerHTML = `${esc(ct.location)}<small>${esc(ct.locationNote)}</small>`;
        // Socials
        if (ct.socials) {
          const links = sec.querySelectorAll('.socials a');
          if (links[0] && ct.socials.linkedin) links[0].setAttribute('href', ct.socials.linkedin);
          if (links[1] && ct.socials.dribbble) links[1].setAttribute('href', ct.socials.dribbble);
          if (links[2] && ct.socials.behance) links[2].setAttribute('href', ct.socials.behance);
          if (links[3] && ct.socials.instagram) links[3].setAttribute('href', ct.socials.instagram);
        }
      }
    }

    /* ====== Footer ====== */
    const ft = data.footer;
    if (ft) {
      const tagEl = $('.foot .brand .tag'); if (tagEl) tagEl.textContent = ft.tagline;
      const copyEl = $('.foot-bottom span:first-child'); if (copyEl) copyEl.textContent = ft.copyright;
      // Now list (third footer column)
      const cols = $$('.foot-grid > div');
      const nowCol = cols[2];
      if (nowCol && ft.nowList) {
        const ul = nowCol.querySelector('ul');
        if (ul) ul.innerHTML = ft.nowList.map(item => `<li>${esc(item)}</li>`).join('');
      }
    }

    /* ====== Re-run reveal observer for any newly-added .reveal nodes ====== */
    // The original observer captures elements on initial load. Any HTML we replaced
    // may include `.reveal` placeholders, but since the originals were already in
    // view we can just mark them in.
    setTimeout(() => {
      $$('.reveal').forEach(el => el.classList.add('in'));
    }, 50);
  }

  function init() {
    const data = window.SiteStore.load();
    hydrate(data);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  window.addEventListener('hw-site-changed', init);
  window.addEventListener('storage', (e) => { if (e.key === 'hw_site_v1') init(); });
})();
