/* ============================================================
   Image Upload Utility — compresses images client-side, then
   uploads directly to Supabase Storage (bucket: 'portfolio').
   Falls back to local server /api/upload if running locally.

   Why this approach?
   - Works seamlessly on Vercel and production (no local server needed).
   - Only a short URL (e.g. https://.../portfolio/img-123.jpg) is
     stored in the database, NOT massive base64 strings.
   - Prevents Supabase egress quota exhaustion permanently.
   ============================================================ */
(function (global) {
  'use strict';

  var BUCKET = 'portfolio';

  /**
   * Compress an image File on a canvas, then upload the resulting
   * blob. Returns a promise that resolves to the image URL or path.
   *
   * @param {File}   file      - The original File from <input>.
   * @param {number} maxWidth  - Maximum pixel width (default 1600).
   * @param {number} quality   - JPEG quality 0-1 (default 0.82).
   * @returns {Promise<string>} Public URL or root-relative path to image.
   */
  function uploadImage(file, maxWidth, quality) {
    maxWidth = maxWidth || 1600;
    quality  = quality  || 0.82;

    return new Promise(function (resolve, reject) {
      if (!file) return reject(new Error('No file selected'));

      var reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () {
        var img = new Image();
        img.onerror = reject;
        img.onload = function () {
          // --- Resize on canvas ---
          var scale = Math.min(1, maxWidth / img.naturalWidth);
          var w = Math.round(img.naturalWidth  * scale);
          var h = Math.round(img.naturalHeight * scale);
          var canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);

          // --- Convert to Blob ---
          canvas.toBlob(function (blob) {
            if (!blob) return reject(new Error('Canvas compression failed'));

            // Safe filename with extension
            var ext = file.name.lastIndexOf('.') >= 0
              ? file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
              : '.jpg';
            if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.webp') {
              ext = '.jpg';
            }
            var cleanBase = (file.name || 'img')
              .replace(/\.[^.]+$/, '')
              .replace(/[^a-zA-Z0-9_-]/g, '-')
              .substring(0, 40);
            var unique = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);
            var fileName = cleanBase + '-' + unique + ext;

            // 1. Primary: Upload to Supabase Storage (works anywhere, including Vercel)
            var client = global.cmsClient;
            if (client && client.storage) {
              client.storage
                .from(BUCKET)
                .upload(fileName, blob, {
                  contentType: blob.type || 'image/jpeg',
                  cacheControl: '31536000',
                  upsert: true
                })
                .then(function (res) {
                  if (res.error) {
                    console.warn('[image-upload] Supabase Storage upload error:', res.error);
                    var msg = res.error.message || '';
                    if (res.error.statusCode === 404 || msg.toLowerCase().indexOf('not found') !== -1) {
                      reject(new Error("Bucket '" + BUCKET + "' belum dibuat di Supabase Storage. Buat bucket '" + BUCKET + "' (Public) di dashboard Supabase."));
                      return;
                    }
                    if (res.error.statusCode === 403 || msg.toLowerCase().indexOf('row-level security') !== -1 || msg.toLowerCase().indexOf('policy') !== -1) {
                      reject(new Error("Akses upload ditolak RLS Supabase. Pastikan policy INSERT sudah diizinkan di bucket '" + BUCKET + "'."));
                      return;
                    }
                    // Try local fallback if not on Vercel
                    tryLocalFallback(res.error.message || 'Upload failed');
                    return;
                  }

                  var urlData = client.storage.from(BUCKET).getPublicUrl(fileName);
                  var publicUrl = (urlData && urlData.data && urlData.data.publicUrl)
                    ? urlData.data.publicUrl
                    : (urlData && urlData.publicUrl ? urlData.publicUrl : '');

                  if (publicUrl) {
                    resolve(publicUrl);
                  } else {
                    reject(new Error('Gagal mendapatkan public URL gambar dari Supabase Storage.'));
                  }
                })
                .catch(function (err) {
                  console.warn('[image-upload] Storage exception:', err);
                  tryLocalFallback(err.message);
                });
              return;
            }

            // 2. Fallback: Local Express server
            tryLocalFallback('Supabase client unavailable');

            function tryLocalFallback(reason) {
              // If we are clearly on Vercel or public hosting, /api/upload won't exist
              var isLocalHost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
              if (!isLocalHost) {
                reject(new Error(
                  'Upload gambar membutuhkan Supabase Storage (bucket "' + BUCKET + '"). ' +
                  (reason ? 'Detail: ' + reason : '')
                ));
                return;
              }

              var fd = new FormData();
              fd.append('image', blob, fileName);
              fetch('/api/upload', { method: 'POST', body: fd })
                .then(function (res) {
                  if (!res.ok) throw new Error('HTTP ' + res.status);
                  return res.json();
                })
                .then(function (data) {
                  if (data && data.ok) resolve(data.path);
                  else reject(new Error((data && data.error) || 'Upload local gagal'));
                })
                .catch(function (err) {
                  reject(new Error('Upload gagal: ' + err.message));
                });
            }
          }, 'image/jpeg', quality);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  global.ImageUpload = { upload: uploadImage, BUCKET: BUCKET };
})(window);
