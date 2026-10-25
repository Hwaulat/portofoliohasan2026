/* ============================================================
   Dev Server — Express-based replacement for live-server.

   Serves all static files from the project root and provides
   a POST /api/upload endpoint that saves images to uploads/.

   This avoids storing base64 data URLs in localStorage/Supabase,
   dramatically reducing Supabase bandwidth usage.
   ============================================================ */
const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 8080;

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// --- Multer config: save with original extension, unique name ---
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext  = path.extname(file.originalname) || '.jpg';
    const base = path.basename(file.originalname, ext)
                     .replace(/[^a-zA-Z0-9_-]/g, '-')
                     .substring(0, 60);
    const unique = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);
    cb(null, `${base}-${unique}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB max
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  }
});

// --- API: upload image ---
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: 'No file uploaded' });
  // Return a root-relative path the browser can use directly as <img src>
  const publicPath = 'uploads/' + req.file.filename;
  res.json({ ok: true, path: publicPath });
});

// Error handler for multer
app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError || err.message) {
    return res.status(400).json({ ok: false, error: err.message });
  }
  res.status(500).json({ ok: false, error: 'Server error' });
});

// --- Serve all static files ---
app.use(express.static(__dirname, {
  extensions: ['html'],
  index: 'index.html'
}));

app.listen(PORT, () => {
  console.log(`\n  🚀  Dev server running at  http://localhost:${PORT}\n`);
});
