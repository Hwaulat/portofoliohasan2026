/* ============================================================
   CMS Cloud Sync — bridges the existing localStorage-based stores
   with a shared Supabase backend so edits sync across all devices
   and visitors.

   How it works:
   - On every page load, pull the `site` and `projects` rows from
     Supabase, write them into localStorage (the keys the existing
     stores already read), and fire the change events so the page
     re-renders with cloud data.
   - When the admin saves (the stores dispatch a change event),
     push the new data back to Supabase. Writes require an
     authenticated session (handled by the admin login gate).

   Public visitors read with the anon key (RLS allows SELECT).
   Only the logged-in admin can write (RLS allows authenticated).
   ============================================================ */
(function (global) {
  'use strict';

  var client = global.cmsClient;
  if (!client) { console.error('[cms-cloud] cmsClient missing — supabase-config.js not loaded?'); return; }

  var SITE_KEY = 'hw_site_v1';
  var PROJ_KEY = 'hw_projects_v1';
  var TABLE = 'cms_data';

  // Guard so cloud-originated writes to localStorage don't echo back
  // to the server as a "save".
  var applyingFromCloud = false;

  function setLocal(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  function readLocal(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; }
  }

  // Pull both rows → localStorage → fire events for renderers & editors.
  function pull() {
    return client.from(TABLE).select('key,data').then(function (res) {
      if (res.error) { console.warn('[cms-cloud] pull error:', res.error.message); return; }
      var rows = res.data || [];
      var site = rows.filter(function (r) { return r.key === 'site'; })[0];
      var proj = rows.filter(function (r) { return r.key === 'projects'; })[0];

      applyingFromCloud = true;
      try {
        if (site && site.data) {
          setLocal(SITE_KEY, site.data);
          global.dispatchEvent(new CustomEvent('hw-site-changed'));
        }
        if (proj && proj.data) {
          setLocal(PROJ_KEY, proj.data);
          global.dispatchEvent(new CustomEvent('hw-projects-changed'));
        }
      } finally {
        applyingFromCloud = false;
      }
      // Distinct event so admin editors can reload their working copy
      // from the freshly-pulled cloud data (without reacting to their
      // own local saves).
      global.dispatchEvent(new CustomEvent('hw-cloud-applied'));
    }, function (err) {
      console.warn('[cms-cloud] pull failed:', err);
    });
  }

  function upsert(key, data) {
    return client.from(TABLE)
      .upsert({ key: key, data: data, updated_at: new Date().toISOString() }, { onConflict: 'key' })
      .then(function (res) {
        if (res.error) {
          console.error('[cms-cloud] save to cloud failed:', res.error.message);
          return { ok: false, error: res.error.message };
        }
        return { ok: true };
      });
  }

  // Push on local edits (admin saves), unless the change came from a pull.
  global.addEventListener('hw-site-changed', function () {
    if (applyingFromCloud) return;
    var d = readLocal(SITE_KEY); if (d) upsert('site', d);
  });
  global.addEventListener('hw-projects-changed', function () {
    if (applyingFromCloud) return;
    var d = readLocal(PROJ_KEY); if (d) upsert('projects', d);
  });

  /* ---- Auth helpers used by the admin login gate ---- */
  var Auth = {
    signIn: function (email, password) {
      return client.auth.signInWithPassword({ email: email, password: password });
    },
    signOut: function () { return client.auth.signOut(); },
    getSession: function () { return client.auth.getSession(); }
  };

  global.CMSCloud = { pull: pull, upsert: upsert, auth: Auth, client: client };

  // Auto-pull as early as possible so every page shows cloud data.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pull);
  } else {
    pull();
  }
})(window);
