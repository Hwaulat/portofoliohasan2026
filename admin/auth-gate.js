/* ============================================================
   CMS Auth Gate — blocks the admin pages behind a Supabase login.

   The password is NOT stored anywhere in this code. Login is
   verified by Supabase Auth (signInWithPassword), which also
   establishes the authenticated session required to WRITE to the
   database. Public visitors never log in and can only read.

   Access is valid only while the user stays within the admin area.
   Leaving to the public site, refreshing, closing the tab, or the
   browser Back button clears it — so returning always re-prompts.
   Navigation between admin pages keeps the session.
   ============================================================ */
(function () {
  'use strict';

  var SESSION_KEY = 'hw_cms_auth';        // '1' once logged in (this admin visit)
  var NAV_KEY = 'hw_cms_internal_nav';    // set just before an admin→admin navigation
  var ADMIN_EMAIL = 'hasanjobs3@gmail.com';

  // Directory of the current admin page, e.g. "/admin/". A link that
  // resolves to a path starting with this stays inside the admin area.
  var ADMIN_BASE = location.pathname.replace(/[^/]*$/, '');

  /* ---- Navigation guards (always active) ---- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    var href = a.getAttribute('href');
    if (!href) return;
    if (/^(javascript:|mailto:|tel:|#)/i.test(href)) return;
    var dest;
    try { dest = new URL(a.href, location.href); } catch (_) { return; }
    if (dest.pathname.indexOf(ADMIN_BASE) === 0) {
      sessionStorage.setItem(NAV_KEY, '1');   // staying in admin → keep session
    } else {
      sessionStorage.removeItem(SESSION_KEY); // leaving admin → force re-login
    }
  }, true);

  window.addEventListener('pagehide', function () {
    if (sessionStorage.getItem(NAV_KEY) !== '1') {
      sessionStorage.removeItem(SESSION_KEY);
    }
    sessionStorage.removeItem(NAV_KEY);
  });

  window.addEventListener('pageshow', function (e) {
    if (e.persisted && sessionStorage.getItem(SESSION_KEY) !== '1') {
      location.reload();
    }
  });

  /* ---- Gate ---- */
  sessionStorage.removeItem(NAV_KEY);
  if (sessionStorage.getItem(SESSION_KEY) === '1') return; // still inside admin → render

  // Hide everything immediately so protected content never flashes.
  var lock = document.createElement('style');
  lock.id = 'cms-lock';
  lock.textContent = 'html{visibility:hidden!important}';
  (document.head || document.documentElement).appendChild(lock);

  function unlock() {
    sessionStorage.setItem(SESSION_KEY, '1');
    var g = document.getElementById('cms-gate');
    if (g) g.remove();
    if (lock) lock.remove();
  }

  function buildGate() {
    var overlay = document.createElement('div');
    overlay.id = 'cms-gate';
    overlay.setAttribute('style', [
      'visibility:visible',
      'position:fixed', 'inset:0', 'z-index:99999',
      'display:flex', 'align-items:center', 'justify-content:center',
      'background:#0E0E0C', 'color:#F5F5F0',
      "font-family:'Geist',system-ui,-apple-system,sans-serif",
      'padding:24px'
    ].join(';'));

    overlay.innerHTML =
      '<form id="cms-gate-form" style="width:100%;max-width:360px;">' +
        '<div style="font-family:\'JetBrains Mono\',ui-monospace,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#9A9AE6;margin-bottom:14px;">Restricted &middot; CMS</div>' +
        '<h1 style="font-family:\'Montserrat\',system-ui,sans-serif;font-weight:600;font-size:28px;line-height:1.15;margin:0 0 8px;">Admin login</h1>' +
        '<p style="color:#A8A8A2;font-size:14px;line-height:1.5;margin:0 0 22px;">Sign in to manage site content. Changes sync to every device.</p>' +
        '<label style="display:block;font-family:\'JetBrains Mono\',ui-monospace,monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#A8A8A2;margin-bottom:6px;">Email</label>' +
        '<input id="cms-gate-email" type="email" autocomplete="username" value="' + ADMIN_EMAIL + '" ' +
          'style="width:100%;box-sizing:border-box;background:transparent;color:#F5F5F0;border:0;border-bottom:1px solid #2A2A26;padding:10px 0;font:inherit;font-size:15px;outline:none;margin-bottom:18px;" />' +
        '<label style="display:block;font-family:\'JetBrains Mono\',ui-monospace,monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#A8A8A2;margin-bottom:6px;">Password</label>' +
        '<input id="cms-gate-input" type="password" autocomplete="current-password" placeholder="Password" ' +
          'style="width:100%;box-sizing:border-box;background:transparent;color:#F5F5F0;border:0;border-bottom:1px solid #2A2A26;padding:10px 0;font:inherit;font-size:15px;outline:none;" />' +
        '<div id="cms-gate-err" style="color:#d9534f;font-size:12px;min-height:16px;margin-top:8px;"></div>' +
        '<button type="submit" id="cms-gate-btn" style="width:100%;margin-top:18px;padding:12px 16px;border-radius:999px;border:1px solid #9A9AE6;background:#9A9AE6;color:#0E0E0C;font:inherit;font-size:14px;font-weight:500;cursor:pointer;">Sign in</button>' +
        '<a href="../Hasan%20Waulat%20-%20Personal%20Branding.html" style="display:block;text-align:center;margin-top:14px;color:#A8A8A2;font-size:13px;text-decoration:none;">&larr; Back to site</a>' +
      '</form>';

    document.body.appendChild(overlay);

    var email = overlay.querySelector('#cms-gate-email');
    var input = overlay.querySelector('#cms-gate-input');
    var err = overlay.querySelector('#cms-gate-err');
    var btn = overlay.querySelector('#cms-gate-btn');
    var form = overlay.querySelector('#cms-gate-form');
    input.focus();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!window.CMSCloud || !window.CMSCloud.auth) {
        err.textContent = 'Auth not ready — check your connection and reload.';
        return;
      }
      btn.disabled = true;
      var original = btn.textContent;
      btn.textContent = 'Signing in…';
      err.textContent = '';
      window.CMSCloud.auth.signIn(email.value.trim(), input.value).then(function (res) {
        if (res && !res.error && res.data && res.data.session) {
          unlock();
        } else {
          err.textContent = (res && res.error && res.error.message) ? res.error.message : 'Login failed.';
          input.value = '';
          input.focus();
          btn.disabled = false;
          btn.textContent = original;
        }
      }).catch(function (ex) {
        err.textContent = 'Login error: ' + (ex && ex.message ? ex.message : 'unknown');
        btn.disabled = false;
        btn.textContent = original;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildGate);
  } else {
    buildGate();
  }
})();
