const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const files = {
  '/fixture': path.join(__dirname, 'fixture.html'),
  '/booklist-enhancer.user.js': path.join(__dirname, '..', 'booklist-enhancer.user.js'),
};

http.createServer((request, response) => {
  const file = files[request.url];
  if (!file) { response.writeHead(404); response.end(); return; }
  response.setHeader('Content-Type', file.endsWith('.html') ? 'text/html; charset=utf-8' : 'text/javascript; charset=utf-8');
  fs.createReadStream(file).pipe(response);
}).listen(8765, '127.0.0.1', () => process.stdout.write('fixture server ready at http://127.0.0.1:8765/fixture\n'));
