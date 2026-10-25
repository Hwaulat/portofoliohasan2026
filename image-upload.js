/* ============================================================
   Image Upload Utility — compresses images client-side then
   uploads the result to /api/upload, returning a local file path
   instead of a huge base64 data URL.

   This keeps localStorage and Supabase sync payloads tiny.
   ============================================================ */
(function (global) {
  'use strict';

  /**
   * Compress an image File on a canvas, then upload the resulting
   * blob to the server.  Returns a promise that resolves to the
   * root-relative path (e.g. "uploads/cover-abc123.jpg").
   *
   * @param {File}   file      - The original File from <input>.
   * @param {number} maxWidth  - Maximum pixel width (default 1600).
   * @param {number} quality   - JPEG quality 0-1 (default 0.82).
   * @returns {Promise<string>} Root-relative path to the saved image.
   */
  function uploadImage(file, maxWidth, quality) {
    maxWidth = maxWidth || 1600;
    quality  = quality  || 0.82;

    return new Promise(function (resolve, reject) {
      if (!file) return reject(new Error('No file'));

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
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);

          // --- Convert to Blob ---
          canvas.toBlob(function (blob) {
            if (!blob) return reject(new Error('Canvas compression failed'));

            // Build a nice filename from the original
            var ext  = file.name.lastIndexOf('.') >= 0
                       ? file.name.slice(file.name.lastIndexOf('.'))
                       : '.jpg';
            var name = file.name.replace(/\.[^.]+$/, '') + ext;

            var fd = new FormData();
            fd.append('image', blob, name);

            // --- Upload to server ---
            fetch('/api/upload', { method: 'POST', body: fd })
              .then(function (res) { return res.json(); })
              .then(function (data) {
                if (data.ok) resolve(data.path);
                else reject(new Error(data.error || 'Upload failed'));
              })
              .catch(reject);
          }, 'image/jpeg', quality);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  global.ImageUpload = { upload: uploadImage };
})(window);
