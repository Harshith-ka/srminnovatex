import { writeFileSync, mkdirSync } from 'fs';

const server = (await import('./dist/server/server.js')).default;

async function fetchPage(url) {
  for (let i = 0; i < 5; i++) {
    const res = await server.fetch(new Request(url), {}, {});
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get('location');
      url = loc.startsWith('http') ? loc : `http://localhost:3000${loc}`;
      continue;
    }
    return res;
  }
  throw new Error('Too many redirects');
}

const res = await fetchPage('http://localhost:3000/');
const html = await res.text();

if (res.status !== 200 || !html.includes('</html>')) {
  console.error(`Pre-render failed (status ${res.status}):`, html.substring(0, 500));
  process.exit(1);
}

mkdirSync('dist/client', { recursive: true });
writeFileSync('dist/client/index.html', html);
writeFileSync('dist/client/404.html', html);

console.log(`Pre-rendered ${html.length} chars to dist/client/index.html`);
