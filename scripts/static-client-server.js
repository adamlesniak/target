const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const staticDir = path.resolve(process.argv[2] || './browser');
const port = parseInt(process.argv[3], 10) || 3080;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const sendFile = (res, filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  const stream = fs.createReadStream(filePath);

  stream.on('error', () => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  });

  res.writeHead(200, { 'Content-Type': contentType });
  stream.pipe(res);
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url || '/');
  let pathname = decodeURIComponent(parsedUrl.pathname || '/');

  if (pathname === '/') {
    pathname = '/index.html';
  }

  const filePath = path.join(staticDir, pathname);

  if (!filePath.startsWith(staticDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const fallback = path.join(staticDir, 'index.html');
      return fs.stat(fallback, (fallbackErr, fallbackStats) => {
        if (fallbackErr || !fallbackStats.isFile()) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          return res.end('Not Found');
        }
        sendFile(res, fallback);
      });
    }
    sendFile(res, filePath);
  });
});

server.listen(port, () => {
  console.log(`Static client server running on http://0.0.0.0:${port}`);
});
