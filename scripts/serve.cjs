const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};
console.log('Starting MDU local server...');
const server = http.createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    return res.end();
  }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const parts = pathname.replace(/\\/g, '/').split('/');
    if (parts.some(part => part.startsWith('.') || part.includes(':'))) {
      res.writeHead(403);
      return res.end('Forbidden');
    }
    let file = path.resolve(root, '.' + pathname);
    if (!file.startsWith(root + path.sep) && file !== root) {
      res.writeHead(403);
      return res.end('Forbidden');
    }
    if ((await fs.stat(file)).isDirectory()) {
      if (!pathname.endsWith('/')) {
        res.writeHead(301, { Location: encodeURI(pathname + '/') });
        return res.end();
      }
      file = path.join(file, 'index.html');
    }
    const body = await fs.readFile(file);
    res.writeHead(200, {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'Content-Length': body.length,
      'Cache-Control': 'no-store',
    });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (error) {
    res.writeHead(error instanceof URIError ? 400 : error.code === 'ENOENT' ? 404 : 500);
    res.end('Unable to serve requested file');
  }
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE'
    ? 'Port 8080 is already in use. Stop the existing server before starting MDU.'
    : error.message);
  process.exitCode = 1;
});
server.listen(8080, 'localhost', () => console.log('MDU ready: http://localhost:8080'));
