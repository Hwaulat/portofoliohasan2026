/* ============================================================
   Supabase client config.

   The publishable ("anon") key is SAFE to expose in client code —
   Row Level Security on the database is what actually protects the
   data: anyone may READ, only an authenticated admin may WRITE.

   Requires the supabase-js UMD bundle to be loaded first.
   ============================================================ */
(function (global) {
  'use strict';
  var lib = global.supabase;
  if (!lib || !lib.createClient) {
    console.error('[cms] supabase-js not loaded before supabase-config.js');
    return;
  }
  global.cmsClient = lib.createClient(
    'https://pvcesehkurtaztsulvnq.supabase.co',
    'sb_publishable_JUA-eaFj3NkgckCy7kxvWQ_jQoWBWr5',
    { auth: { persistSession: true, autoRefreshToken: true } }
  );
})(window);
