/* ============================================================
   CMS Auth Gate — blocks the admin pages behind a password.
   The plaintext password is never stored here; only a one-way
   SHA-256 hash is kept, and the entered password is hashed in
   the browser and compared against it.

   Auth is remembered for the current tab session only
   (sessionStorage), so navigating between admin pages won't
   re-prompt, but closing the tab requires the password again.
   ============================================================ */
(function () {
  'use strict';

  var SESSION_KEY = 'hw_cms_auth';
  var PASS_HASH = 'e441519ffb0f353eaa2a7b865e550ff4659aec5000155ee72577101ed522d367';

  // Already authenticated this session — let the page render normally.
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
