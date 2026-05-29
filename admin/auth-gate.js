/* ============================================================
   CMS Auth Gate — blocks the admin pages behind a password.

   The plaintext password is never stored here; only a one-way
   SHA-256 hash is kept, and the entered password is hashed in
   the browser and compared against it.

   Auth is valid ONLY while the user stays within the admin area.
   Navigating between admin pages keeps the session, but leaving
   the admin area (to the public site), refreshing, closing the
   tab, or using the browser Back button clears it — so returning
   to the admin area always requires the password again.
   ============================================================ */
(function () {
  'use strict';

  var SESSION_KEY = 'hw_cms_auth';        // '1' once authenticated
  var NAV_KEY = 'hw_cms_internal_nav';    // set just before an admin→admin navigation
  var PASS_HASH = 'e441519ffb0f353eaa2a7b865e550ff4659aec5000155ee72577101ed522d367';

  // Directory of the current admin page, e.g. "/admin/". Any link that
  // resolves to a path starting with this is "internal" to the admin area.
  var ADMIN_BASE = location.pathname.replace(/[^/]*$/, '');

  /* ---- Navigation guards (always active, regardless of auth state) ---- */

  // Decide, at click time, whether a navigation stays inside admin.
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    // Links that don't unload the current page leave auth untouched.
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

  // On unload, clear auth unless this was an internal admin navigation.
  window.addEventListener('pagehide', function () {
    if (sessionStorage.getItem(NAV_KEY) !== '1') {
      sessionStorage.removeItem(SESSION_KEY);
    }
    sessionStorage.removeItem(NAV_KEY);
  });

  // Back/forward cache can restore an authed-looking page without re-running
  // scripts. If we're restored from bfcache and no longer authed, reload so
  // the gate runs fresh.
  window.addEventListener('pageshow', function (e) {
    if (e.persisted && sessionStorage.getItem(SESSION_KEY) !== '1') {
      location.reload();
    }
  });

  /* ---- Gate ---- */

  // Consume any stale internal-nav marker for this fresh page view.
  sessionStorage.removeItem(NAV_KEY);

  // Already authenticated and still inside admin — let the page render.
  if (sessionStorage.getItem(SESSION_KEY) === '1') return;

  // Hide everything immediately so protected content never flashes.
  var lock = document.createElement('style');
  lock.id = 'cms-lock';
  lock.textContent = 'html{visibility:hidden!important}';
  (document.head || document.documentElement).appendChild(lock);

  function sha256hex(str) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return ('0' + b.toString(16)).slice(-2);
      }).join('');
    });
  }

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
        '<h1 style="font-family:\'Montserrat\',system-ui,sans-serif;font-weight:600;font-size:28px;line-height:1.15;margin:0 0 8px;">Enter password</h1>' +
        '<p style="color:#A8A8A2;font-size:14px;line-height:1.5;margin:0 0 22px;">This area is protected. Enter the password to manage site content.</p>' +
        '<input id="cms-gate-input" type="password" autocomplete="current-password" placeholder="Password" ' +
          'style="width:100%;box-sizing:border-box;background:transparent;color:#F5F5F0;border:0;border-bottom:1px solid #2A2A26;padding:12px 0;font:inherit;font-size:16px;outline:none;" />' +
        '<div id="cms-gate-err" style="color:#d9534f;font-size:12px;min-height:16px;margin-top:8px;"></div>' +
        '<button type="submit" style="width:100%;margin-top:18px;padding:12px 16px;border-radius:999px;border:1px solid #9A9AE6;background:#9A9AE6;color:#0E0E0C;font:inherit;font-size:14px;font-weight:500;cursor:pointer;">Unlock CMS</button>' +
        '<a href="../Hasan%20Waulat%20-%20Personal%20Branding.html" style="display:block;text-align:center;margin-top:14px;color:#A8A8A2;font-size:13px;text-decoration:none;">&larr; Back to site</a>' +
      '</form>';

    document.body.appendChild(overlay);

    var input = overlay.querySelector('#cms-gate-input');
    var err = overlay.querySelector('#cms-gate-err');
    var form = overlay.querySelector('#cms-gate-form');
    input.focus();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      sha256hex(input.value).then(function (h) {
        if (h === PASS_HASH) {
          unlock();
        } else {
          err.textContent = 'Incorrect password. Try again.';
          input.value = '';
          input.focus();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildGate);
  } else {
    buildGate();
  }
})();
