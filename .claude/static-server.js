const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = process.argv[2], PORT = process.argv[3] || 5503;
const TYPES = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.json':'application/json','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  let fp = path.join(ROOT, p);
  if (fp.endsWith(path.sep) || p==='/' ) fp = path.join(fp,'index.html');
  fs.stat(fp,(err,st)=>{
    if(!err && st.isDirectory()) fp = path.join(fp,'index.html');
    fs.readFile(fp,(e,data)=>{
      if(e){ res.writeHead(404); res.end('404 '+p); return; }
      res.writeHead(200,{'Content-Type':TYPES[path.extname(fp)]||'application/octet-stream'});
      res.end(data);
    });
  });
}).listen(PORT, ()=>console.log('static server on '+PORT+' root='+ROOT));
