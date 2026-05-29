/* ============================================================
   Editor Render — for each site section, build a form into the
   passed container. Called from admin/site.html.

   Exposes: window.renderEditor(sectionId, data, container, onChange)
   ============================================================ */
(function (global) {
  'use strict';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));

  /* ====== Reusable helpers ====== */
  function panel(title, hint) {
    const p = document.createElement('div');
    p.className = 'panel';
    p.innerHTML = `<div class="panel-head"><h3>${esc(title)}</h3>${hint ? `<span class="hint">${esc(hint)}</span>` : ''}</div><div class="panel-body"></div>`;
    return p;
  }
  function field(label, input, help) {
    const f = document.createElement('div');
    f.className = 'fld';
    const id = 'f-' + Math.random().toString(36).slice(2, 8);
    const lab = document.createElement('label'); lab.htmlFor = id; lab.textContent = label;
    input.id = id;
    f.appendChild(lab); f.appendChild(input);
    if (help) {
      const h = document.createElement('span'); h.className = 'help'; h.innerHTML = help;
      f.appendChild(h);
    }
    return f;
  }
  function textInput(value, onInput) {
    const el = document.createElement('input');
    el.type = 'text'; el.value = value ?? '';
    el.addEventListener('input', () => onInput(el.value));
    return el;
  }
  function textareaInput(value, onInput, minH = 80) {
    const el = document.createElement('textarea');
    el.value = value ?? ''; el.style.minHeight = minH + 'px';
    el.addEventListener('input', () => onInput(el.value));
    return el;
  }
  function checkboxInput(checked, onChange, labelText, descText) {
    const w = document.createElement('div'); w.className = 'toggle';
    const id = 'c-' + Math.random().toString(36).slice(2, 8);
    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.id = id; cb.checked = !!checked;
    cb.addEventListener('change', () => onChange(cb.checked));
    const body = document.createElement('div'); body.className = 'body';
    body.innerHTML = `<label for="${id}">${esc(labelText)}</label>${descText ? `<div class="desc">${esc(descText)}</div>` : ''}`;
    w.appendChild(cb); w.appendChild(body);
    return w;
  }
  function stringListEditor(arr, onChange) {
    const wrap = document.createElement('div');
    function render() {
      wrap.innerHTML = '';
      const rows = document.createElement('div'); rows.className = 'list-rows';
      arr.forEach((v, i) => {
        const row = document.createElement('div'); row.className = 'list-row';
        const inp = document.createElement('input'); inp.value = v; inp.placeholder = 'Item ' + (i + 1);
        inp.addEventListener('input', () => { arr[i] = inp.value; onChange(); });
        const del = document.createElement('button'); del.textContent = '−';
        del.addEventListener('click', () => { arr.splice(i, 1); onChange(); render(); });
        const up = document.createElement('button'); up.textContent = '↑'; up.title = 'Move up';
        up.addEventListener('click', () => { if (i > 0) { [arr[i-1], arr[i]] = [arr[i], arr[i-1]]; onChange(); render(); } });
        const down = document.createElement('button'); down.textContent = '↓'; down.title = 'Move down';
        down.addEventListener('click', () => { if (i < arr.length - 1) { [arr[i+1], arr[i]] = [arr[i], arr[i+1]]; onChange(); render(); } });
        row.appendChild(inp); row.appendChild(up); row.appendChild(down); row.appendChild(del);
        rows.appendChild(row);
      });
      wrap.appendChild(rows);
      const add = document.createElement('button'); add.className = 'add-btn'; add.textContent = '+ Add item';
      add.addEventListener('click', () => { arr.push(''); onChange(); render(); });
      const addWrap = document.createElement('div'); addWrap.style.marginTop = '8px'; addWrap.appendChild(add);
      wrap.appendChild(addWrap);
    }
    render();
    return wrap;
  }
  function repeatingEditor(arr, opts, onChange) {
    // opts: { itemTitle, renderItem(item, idx, onItemChange), defaults() }
    const wrap = document.createElement('div');
    function render() {
      wrap.innerHTML = '';
      arr.forEach((item, i) => {
        const ri = document.createElement('div'); ri.className = 'row-item';
        const head = document.createElement('div'); head.className = 'ri-head';
        head.innerHTML = `<strong>${esc(opts.itemTitle)} ${String(i + 1).padStart(2, '0')}</strong>`;
        const up = document.createElement('button'); up.textContent = '↑';
        up.addEventListener('click', () => { if (i > 0) { [arr[i-1], arr[i]] = [arr[i], arr[i-1]]; onChange(); render(); } });
        const down = document.createElement('button'); down.textContent = '↓';
        down.addEventListener('click', () => { if (i < arr.length - 1) { [arr[i+1], arr[i]] = [arr[i], arr[i+1]]; onChange(); render(); } });
        const del = document.createElement('button'); del.textContent = '✕';
        del.addEventListener('click', () => { if (confirm('Delete this item?')) { arr.splice(i, 1); onChange(); render(); } });
        head.appendChild(up); head.appendChild(down); head.appendChild(del);
        ri.appendChild(head);
        const body = document.createElement('div');
        opts.renderItem(item, i, () => onChange(), body);
        ri.appendChild(body);
        wrap.appendChild(ri);
      });
      const add = document.createElement('button'); add.className = 'add-btn'; add.textContent = '+ Add ' + opts.itemTitle.toLowerCase();
      add.addEventListener('click', () => { arr.push(opts.defaults()); onChange(); render(); });
      wrap.appendChild(add);
    }
    render();
    return wrap;
  }

  /* ====== Section editors ====== */
  function header(d, change) {
    const root = document.createElement('div');
    const p1 = panel('Brand', 'Logo mark and page title');
    const body1 = p1.querySelector('.panel-body');
    const grid1 = document.createElement('div'); grid1.className = 'grid-2'; body1.appendChild(grid1);
    grid1.appendChild(field('Brand initial (in circle)', textInput(d.brandInitial, v => { d.brandInitial = v; change(); })));
    grid1.appendChild(field('Brand name', textInput(d.brandName, v => { d.brandName = v; change(); })));
    grid1.appendChild(field('Job title (after dash)', textInput(d.brandTitle, v => { d.brandTitle = v; change(); })));
    root.appendChild(p1);

    const p2 = panel('Header buttons', 'CV download and WhatsApp');
    const body2 = p2.querySelector('.panel-body');
    body2.appendChild(field('CV file path', textInput(d.cvPath, v => { d.cvPath = v; change(); }), 'Path to your PDF. Default: <code>cv/Hasan-Waulat-CV.pdf</code>. Upload your PDF to that folder.'));
    const g = document.createElement('div'); g.className = 'grid-2';
    g.appendChild(field('WhatsApp number', textInput(d.waNumber, v => { d.waNumber = v; change(); }), 'No spaces or symbols — e.g. <code>6285254308418</code>'));
    g.appendChild(field('WhatsApp pre-fill message', textInput(d.waMessage, v => { d.waMessage = v; change(); })));
    body2.appendChild(g);
    root.appendChild(p2);
    return root;
  }

  function hero(d, change) {
    const root = document.createElement('div');
    const p = panel('Hero text', 'The big section at the top of the page');
    const body = p.querySelector('.panel-body');
    body.appendChild(field('Eyebrow (small line above headline)', textInput(d.eyebrow, v => { d.eyebrow = v; change(); })));

    const linesPanel = document.createElement('div');
    linesPanel.innerHTML = '<div class="fld" style="margin-bottom: 8px;"><label>Headline lines</label><span class="help">Each line becomes a row. Wrap words in <code>&lt;em&gt;…&lt;/em&gt;</code> for accent italic style.</span></div>';
    linesPanel.appendChild(stringListEditor(d.headlineLines, change));
    body.appendChild(linesPanel);

    body.appendChild(field('Sub-headline (paragraph below)', textareaInput(d.sub, v => { d.sub = v; change(); }, 90), 'You can use <code>&lt;strong&gt;…&lt;/strong&gt;</code> for bold.'));
    body.appendChild(field('"Currently designing" badge', textInput(d.nowBadge, v => { d.nowBadge = v; change(); })));
    body.appendChild(field('Scroll cue text (under buttons)', textInput(d.scrollCue, v => { d.scrollCue = v; change(); })));
    root.appendChild(p);

    const p2 = panel('Buttons (3 hero CTAs)');
    const body2 = p2.querySelector('.panel-body');
    const g2 = document.createElement('div'); g2.className = 'grid-2';
    g2.appendChild(field('Primary button text', textInput(d.ctaPrimary, v => { d.ctaPrimary = v; change(); })));
    g2.appendChild(field('Primary button link', textInput(d.ctaPrimaryHref, v => { d.ctaPrimaryHref = v; change(); })));
    g2.appendChild(field('Secondary button text', textInput(d.ctaSecondaryText, v => { d.ctaSecondaryText = v; change(); })));
    g2.appendChild(field('Secondary button link', textInput(d.ctaSecondaryHref, v => { d.ctaSecondaryHref = v; change(); })));
    g2.appendChild(field('Tertiary button text', textInput(d.ctaTertiaryText, v => { d.ctaTertiaryText = v; change(); })));
    g2.appendChild(field('Tertiary button link', textInput(d.ctaTertiaryHref, v => { d.ctaTertiaryHref = v; change(); })));
    body2.appendChild(g2);
    root.appendChild(p2);

    const p3 = panel('Trust strip', 'Company names shown under the hero CTA');
    p3.querySelector('.panel-body').appendChild(stringListEditor(d.trust, change));
    root.appendChild(p3);

    const p4 = panel('Hero photo', 'Path to your portrait image — default: assets/profile.png');
    const body4 = p4.querySelector('.panel-body');
    const slot = document.createElement('div');
    slot.className = 'image-slot' + (d.photo ? ' has-image' : '');
    if (d.photo) {
      slot.innerHTML = `<button class="remove-btn">✕</button><img src="${esc(d.photo)}" alt="" />`;
      slot.querySelector('.remove-btn').addEventListener('click', e => { e.stopPropagation(); d.photo = ''; change(); root.replaceChild(hero(d, change), root.lastChild); /* re-render this panel only would be cleaner; full hero re-render is acceptable */ });
    } else {
      slot.innerHTML = `<div class="placeholder"><strong>Click or drop a portrait image</strong><br/><small style="color:var(--muted); font-family: 'JetBrains Mono', monospace; font-size: 10px;">JPG/PNG · auto-resized to 1200px wide</small></div>`;
    }
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*'; slot.appendChild(input);
    slot.addEventListener('click', e => { if (!e.target.closest('button')) input.click(); });
    input.addEventListener('change', async e => {
      const f = e.target.files[0]; if (!f) return;
      try {
        const url = await SiteStore.fileToCompressedDataURL(f, 1200, 0.85);
        d.photo = url; change();
        // Re-render the hero editor
        const fresh = hero(d, change);
        root.parentNode.replaceChild(fresh, root);
      } catch (err) { alert('Failed: ' + err.message); }
    });
    body4.appendChild(slot);
    body4.appendChild(field('Or use a file path', textInput(d.photo, v => { d.photo = v; change(); }), 'Defaults to <code>assets/profile.png</code>'));
    root.appendChild(p4);
    return root;
  }

  function metrics(d, change) {
    const root = document.createElement('div');
    const p = panel('Metrics', 'Three big numbers shown under the hero');
    const body = p.querySelector('.panel-body');
    body.appendChild(repeatingEditor(d, {
      itemTitle: 'Metric',
      defaults: () => ({ value: 0, suffix: '', label: '' }),
      renderItem: (m, i, onChange, container) => {
        const g = document.createElement('div'); g.className = 'grid-3';
        const v = document.createElement('input'); v.type = 'number'; v.value = m.value;
        v.addEventListener('input', () => { m.value = parseFloat(v.value) || 0; onChange(); });
        const vf = document.createElement('div'); vf.className = 'fld';
        const vl = document.createElement('label'); vl.textContent = 'Value (animated counter)';
        vf.appendChild(vl); vf.appendChild(v);
        g.appendChild(vf);
        g.appendChild(field('Suffix (e.g. + yrs, %)', textInput(m.suffix, val => { m.suffix = val; onChange(); })));
        g.appendChild(field('Label below number', textInput(m.label, val => { m.label = val; onChange(); })));
        container.appendChild(g);
      }
    }, change));
    root.appendChild(p);
    return root;
  }

  function about(d, change) {
    const root = document.createElement('div');
    const p = panel('Heading');
    const body = p.querySelector('.panel-body');
    body.appendChild(field('Eyebrow', textInput(d.eyebrow, v => { d.eyebrow = v; change(); })));
    body.appendChild(field('Headline', textareaInput(d.headline, v => { d.headline = v; change(); }, 70), 'Wrap accent words in <code>&lt;em&gt;…&lt;/em&gt;</code>'));
    root.appendChild(p);

    const p2 = panel('Bio paragraphs', '3 paragraphs about you');
    const body2 = p2.querySelector('.panel-body');
    const wrap = document.createElement('div');
    body2.appendChild(wrap);
    function renderParas() {
      wrap.innerHTML = '';
      (d.paragraphs || []).forEach((par, i) => {
        const f = document.createElement('div'); f.className = 'fld'; f.style.marginBottom = '12px';
        const lab = document.createElement('label'); lab.textContent = 'Paragraph ' + (i + 1);
        const ctrls = document.createElement('div'); ctrls.style.cssText = 'display:flex; gap:6px; align-items:center; margin-bottom:6px;';
        ctrls.appendChild(lab);
        const sp = document.createElement('div'); sp.style.flex = '1'; ctrls.appendChild(sp);
        const up = document.createElement('button'); up.textContent = '↑'; up.style.cssText = 'width:24px;height:24px;border:1px solid var(--border);background:transparent;color:var(--muted);border-radius:4px;cursor:pointer;';
        up.addEventListener('click', () => { if (i > 0) { [d.paragraphs[i-1], d.paragraphs[i]] = [d.paragraphs[i], d.paragraphs[i-1]]; change(); renderParas(); } });
        const down = document.createElement('button'); down.textContent = '↓'; down.style.cssText = up.style.cssText;
        down.addEventListener('click', () => { if (i < d.paragraphs.length - 1) { [d.paragraphs[i+1], d.paragraphs[i]] = [d.paragraphs[i], d.paragraphs[i+1]]; change(); renderParas(); } });
        const del = document.createElement('button'); del.textContent = '✕'; del.style.cssText = up.style.cssText;
        del.addEventListener('click', () => { d.paragraphs.splice(i, 1); change(); renderParas(); });
        ctrls.appendChild(up); ctrls.appendChild(down); ctrls.appendChild(del);
        f.appendChild(ctrls);
        const ta = document.createElement('textarea'); ta.value = par; ta.style.minHeight = '90px';
        ta.addEventListener('input', () => { d.paragraphs[i] = ta.value; change(); });
        f.appendChild(ta);
        wrap.appendChild(f);
      });
      const add = document.createElement('button'); add.className = 'add-btn'; add.textContent = '+ Add paragraph';
      add.addEventListener('click', () => { d.paragraphs.push(''); change(); renderParas(); });
      wrap.appendChild(add);
    }
    renderParas();
    body2.appendChild(field('Download CV link text', textInput(d.ctaText, v => { d.ctaText = v; change(); })));
    root.appendChild(p2);

    const p3 = panel('"Currently" sidebar card', 'Right-side panel in the About section');
    p3.querySelector('.panel-body').appendChild(repeatingEditor(d.nowCard, {
      itemTitle: 'Row',
      defaults: () => ({ k: '', v: '' }),
      renderItem: (row, i, onChange, container) => {
        const g = document.createElement('div'); g.className = 'grid-2';
        g.appendChild(field('Label', textInput(row.k, val => { row.k = val; onChange(); })));
        g.appendChild(field('Value', textInput(row.v, val => { row.v = val; onChange(); }), 'You can use <code>&lt;em&gt;…&lt;/em&gt;</code> for accent text.'));
        container.appendChild(g);
      }
    }, change));
    root.appendChild(p3);

    return root;
  }

  function customers(d, change) {
    const root = document.createElement('div');
    const p = panel('Customer logo marquee', 'Names that scroll across the screen below About');
    p.querySelector('.panel-body').appendChild(repeatingEditor(d, {
      itemTitle: 'Customer',
      defaults: () => ({ initial: 'X', name: 'Company Name' }),
      renderItem: (c, i, onChange, container) => {
        const g = document.createElement('div'); g.className = 'grid-2';
        g.appendChild(field('Initial (in glyph box)', textInput(c.initial, val => { c.initial = val; onChange(); })));
        g.appendChild(field('Name (shown as text)', textInput(c.name, val => { c.name = val; onChange(); })));
        container.appendChild(g);
      }
    }, change));
    root.appendChild(p);
    return root;
  }

  function skills(d, change) {
    const root = document.createElement('div');
    const p = panel('Heading');
    const body = p.querySelector('.panel-body');
    body.appendChild(field('Eyebrow', textInput(d.eyebrow, v => { d.eyebrow = v; change(); })));
    body.appendChild(field('Headline', textareaInput(d.headline, v => { d.headline = v; change(); }, 70), 'Wrap accent words in <code>&lt;em&gt;…&lt;/em&gt;</code>'));
    body.appendChild(field('Description paragraph', textareaInput(d.desc, v => { d.desc = v; change(); }, 80)));
    root.appendChild(p);

    const p2 = panel('Pillars (3 role cards)');
    p2.querySelector('.panel-body').appendChild(repeatingEditor(d.pillars, {
      itemTitle: 'Pillar',
      defaults: () => ({ role: 'Role · ?', title: '', desc: '', items: [], stack: [] }),
      renderItem: (pl, i, onChange, container) => {
        const inner = document.createElement('div');
        inner.appendChild(field('Role tag (e.g. "Role 01 · Designer")', textInput(pl.role, val => { pl.role = val; onChange(); })));
        inner.appendChild(field('Title', textareaInput(pl.title, val => { pl.title = val; onChange(); }, 60), 'Use <code>&lt;em&gt;…&lt;/em&gt;</code> for accent italic'));
        inner.appendChild(field('Description', textareaInput(pl.desc, val => { pl.desc = val; onChange(); }, 70)));
        inner.appendChild(field('Skill items (bullet list)', document.createElement('div'), 'One per row'));
        inner.lastChild.querySelector('.fld:last-child') || inner.lastChild;
        const listWrap = document.createElement('div'); listWrap.style.marginTop = '-8px';
        listWrap.appendChild(stringListEditor(pl.items, onChange));
        inner.appendChild(listWrap);
        const stackLabel = document.createElement('div'); stackLabel.style.cssText = 'font-family: JetBrains Mono, monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin: 14px 0 6px;';
        stackLabel.textContent = 'Tool chips (comma-separated)';
        inner.appendChild(stackLabel);
        const stackInput = document.createElement('input');
        stackInput.value = (pl.stack || []).join(', ');
        stackInput.style.cssText = 'background:var(--bg);color:var(--fg);border:1px solid var(--border);border-radius:4px;padding:9px 12px;font:inherit;font-size:14px;width:100%;box-sizing:border-box;outline:none;';
        stackInput.addEventListener('input', () => { pl.stack = stackInput.value.split(',').map(s => s.trim()).filter(Boolean); onChange(); });
        inner.appendChild(stackInput);
        container.appendChild(inner);
      }
    }, change));
    root.appendChild(p2);

    const p3 = panel('End-to-end flow strip', 'The 6-step process bar below the pillars');
    p3.querySelector('.panel-body').appendChild(repeatingEditor(d.e2e, {
      itemTitle: 'Step',
      defaults: () => ({ n: '01', label: '', role: '' }),
      renderItem: (s, i, onChange, container) => {
        const g = document.createElement('div'); g.className = 'grid-3';
        g.appendChild(field('Number', textInput(s.n, val => { s.n = val; onChange(); })));
        g.appendChild(field('Label', textInput(s.label, val => { s.label = val; onChange(); })));
        g.appendChild(field('Role tag', textInput(s.role, val => { s.role = val; onChange(); })));
        container.appendChild(g);
      }
    }, change));
    root.appendChild(p3);

    return root;
  }

  function services(d, change) {
    const root = document.createElement('div');
    const p = panel('Heading');
    const body = p.querySelector('.panel-body');
    body.appendChild(field('Eyebrow', textInput(d.eyebrow, v => { d.eyebrow = v; change(); })));
    body.appendChild(field('Headline', textareaInput(d.headline, v => { d.headline = v; change(); }, 60), 'Wrap accent words in <code>&lt;em&gt;…&lt;/em&gt;</code>'));
    root.appendChild(p);

    const p2 = panel('Service cards (3)');
    p2.querySelector('.panel-body').appendChild(repeatingEditor(d.cards, {
      itemTitle: 'Service',
      defaults: () => ({ num: '01', title: '', desc: '', items: [], tools: '' }),
      renderItem: (c, i, onChange, container) => {
        const inner = document.createElement('div');
        const g = document.createElement('div'); g.className = 'grid-2';
        g.appendChild(field('Number', textInput(c.num, val => { c.num = val; onChange(); })));
        g.appendChild(field('Tools line', textInput(c.tools, val => { c.tools = val; onChange(); })));
        inner.appendChild(g);
        inner.appendChild(field('Title', textareaInput(c.title, val => { c.title = val; onChange(); }, 60)));
        inner.appendChild(field('Description', textareaInput(c.desc, val => { c.desc = val; onChange(); }, 70)));
        const listLabel = document.createElement('div'); listLabel.style.cssText = 'font-family: JetBrains Mono, monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin: 14px 0 6px;';
        listLabel.textContent = 'Deliverable items';
        inner.appendChild(listLabel);
        inner.appendChild(stringListEditor(c.items, onChange));
        container.appendChild(inner);
      }
    }, change));
    root.appendChild(p2);

    return root;
  }

  function process(d, change) {
    const root = document.createElement('div');
    const p = panel('Heading');
    const body = p.querySelector('.panel-body');
    body.appendChild(field('Eyebrow', textInput(d.eyebrow, v => { d.eyebrow = v; change(); })));
    body.appendChild(field('Headline', textareaInput(d.headline, v => { d.headline = v; change(); }, 60)));
    body.appendChild(field('Note (small text below steps)', textInput(d.note, v => { d.note = v; change(); })));
    root.appendChild(p);

    const p2 = panel('Process steps');
    p2.querySelector('.panel-body').appendChild(repeatingEditor(d.steps, {
      itemTitle: 'Step',
      defaults: () => ({ n: '01', week: '', title: '', desc: '' }),
      renderItem: (s, i, onChange, container) => {
        const g = document.createElement('div'); g.className = 'grid-2';
        g.appendChild(field('Number', textInput(s.n, val => { s.n = val; onChange(); })));
        g.appendChild(field('Week label', textInput(s.week, val => { s.week = val; onChange(); })));
        g.appendChild(field('Title', textInput(s.title, val => { s.title = val; onChange(); })));
        const descFld = field('Description', textareaInput(s.desc, val => { s.desc = val; onChange(); }, 60));
        descFld.classList.add('full'); descFld.style.gridColumn = '1 / -1';
        g.appendChild(descFld);
        container.appendChild(g);
      }
    }, change));
    root.appendChild(p2);

    return root;
  }

  function experience(d, change) {
    const root = document.createElement('div');
    const p = panel('Heading');
    const body = p.querySelector('.panel-body');
    body.appendChild(field('Eyebrow', textInput(d.eyebrow, v => { d.eyebrow = v; change(); })));
    body.appendChild(field('Headline', textareaInput(d.headline, v => { d.headline = v; change(); }, 60)));
    root.appendChild(p);

    const p2 = panel('Timeline items (top = most recent)');
    p2.querySelector('.panel-body').appendChild(repeatingEditor(d.items, {
      itemTitle: 'Role',
      defaults: () => ({ now: false, when: '', title: '', org: '', desc: '', bullets: [] }),
      renderItem: (it, i, onChange, container) => {
        const inner = document.createElement('div');
        inner.appendChild(checkboxInput(it.now, v => { it.now = v; onChange(); }, 'Mark as "Now" (highlighted node + green pulse)', 'Use on your current role only.'));
        const g = document.createElement('div'); g.className = 'grid-2'; g.style.marginTop = '12px';
        g.appendChild(field('Date & location', textInput(it.when, val => { it.when = val; onChange(); }), 'e.g. "Jun 2025 – Dec 2025 · Jakarta · Now"'));
        g.appendChild(field('Title', textInput(it.title, val => { it.title = val; onChange(); })));
        g.appendChild(field('Organization', textInput(it.org, val => { it.org = val; onChange(); })));
        const descFld = field('Description', textareaInput(it.desc, val => { it.desc = val; onChange(); }, 70));
        descFld.style.gridColumn = '1 / -1';
        g.appendChild(descFld);
        inner.appendChild(g);
        const bLabel = document.createElement('div'); bLabel.style.cssText = 'font-family: JetBrains Mono, monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin: 14px 0 6px;';
        bLabel.textContent = 'Key wins (bullet list — optional)';
        inner.appendChild(bLabel);
        inner.appendChild(stringListEditor(it.bullets, onChange));
        container.appendChild(inner);
      }
    }, change));
    root.appendChild(p2);

    return root;
  }

  function testimonials(d, change) {
    const root = document.createElement('div');
    const p = panel('Heading');
    const body = p.querySelector('.panel-body');
    body.appendChild(field('Eyebrow', textInput(d.eyebrow, v => { d.eyebrow = v; change(); })));
    body.appendChild(field('Headline', textareaInput(d.headline, v => { d.headline = v; change(); }, 60)));
    root.appendChild(p);

    const p2 = panel('Testimonials');
    p2.querySelector('.panel-body').appendChild(repeatingEditor(d.items, {
      itemTitle: 'Quote',
      defaults: () => ({ quote: '', name: '', role: '', initial: '?' }),
      renderItem: (t, i, onChange, container) => {
        const inner = document.createElement('div');
        inner.appendChild(field('Quote', textareaInput(t.quote, val => { t.quote = val; onChange(); }, 80)));
        const g = document.createElement('div'); g.className = 'grid-3';
        g.appendChild(field('Avatar initial', textInput(t.initial, val => { t.initial = val; onChange(); })));
        g.appendChild(field('Name', textInput(t.name, val => { t.name = val; onChange(); })));
        g.appendChild(field('Role · Company', textInput(t.role, val => { t.role = val; onChange(); })));
        inner.appendChild(g);
        container.appendChild(inner);
      }
    }, change));
    root.appendChild(p2);

    return root;
  }

  function contact(d, change) {
    const root = document.createElement('div');
    const p = panel('Heading');
    const body = p.querySelector('.panel-body');
    body.appendChild(field('Eyebrow', textInput(d.eyebrow, v => { d.eyebrow = v; change(); })));
    body.appendChild(field('Headline', textareaInput(d.headline, v => { d.headline = v; change(); }, 60)));
    body.appendChild(field('Description paragraph', textareaInput(d.desc, v => { d.desc = v; change(); }, 90)));
    root.appendChild(p);

    const p2 = panel('Contact info rows');
    const body2 = p2.querySelector('.panel-body');
    const g2 = document.createElement('div'); g2.className = 'grid-2';
    g2.appendChild(field('Email', textInput(d.email, v => { d.email = v; change(); })));
    g2.appendChild(field('Email note (small text)', textInput(d.emailNote, v => { d.emailNote = v; change(); })));
    g2.appendChild(field('Phone', textInput(d.phone, v => { d.phone = v; change(); })));
    g2.appendChild(field('Phone note', textInput(d.phoneNote, v => { d.phoneNote = v; change(); })));
    g2.appendChild(field('Location', textInput(d.location, v => { d.location = v; change(); })));
    g2.appendChild(field('Location note', textInput(d.locationNote, v => { d.locationNote = v; change(); })));
    body2.appendChild(g2);
    root.appendChild(p2);

    const p3 = panel('Social links');
    const body3 = p3.querySelector('.panel-body');
    const g3 = document.createElement('div'); g3.className = 'grid-2';
    g3.appendChild(field('LinkedIn URL', textInput(d.socials?.linkedin, v => { d.socials = d.socials || {}; d.socials.linkedin = v; change(); })));
    g3.appendChild(field('Dribbble URL', textInput(d.socials?.dribbble, v => { d.socials = d.socials || {}; d.socials.dribbble = v; change(); })));
    g3.appendChild(field('Behance URL', textInput(d.socials?.behance, v => { d.socials = d.socials || {}; d.socials.behance = v; change(); })));
    g3.appendChild(field('Instagram URL', textInput(d.socials?.instagram, v => { d.socials = d.socials || {}; d.socials.instagram = v; change(); })));
    body3.appendChild(g3);
    root.appendChild(p3);

    return root;
  }

  function footer(d, change) {
    const root = document.createElement('div');
    const p = panel('Footer text');
    const body = p.querySelector('.panel-body');
    body.appendChild(field('Tagline', textareaInput(d.tagline, v => { d.tagline = v; change(); }, 70)));
    body.appendChild(field('Copyright line (bottom-left)', textInput(d.copyright, v => { d.copyright = v; change(); })));
    root.appendChild(p);

    const p2 = panel('"Now" footer column', 'Right-most footer column');
    p2.querySelector('.panel-body').appendChild(stringListEditor(d.nowList, change));
    root.appendChild(p2);

    return root;
  }

  /* ====== Dispatch ====== */
  const map = {
    header, hero, metrics, about, customers,
    skills, services, process, experience,
    testimonials, contact, footer
  };

  global.renderEditor = function (sectionId, data, container, onChange) {
    const fn = map[sectionId];
    if (!fn) {
      container.innerHTML = '<p style="color:var(--muted);">No editor for "' + sectionId + '"</p>';
      return;
    }
    // Ensure the section exists on data
    if (!data[sectionId]) data[sectionId] = JSON.parse(JSON.stringify(SiteStore.DEFAULT[sectionId]));
    container.appendChild(fn(data[sectionId], onChange));
  };
})(window);
