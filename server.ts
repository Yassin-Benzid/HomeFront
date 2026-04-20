import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  // If a request targets a component template (e.g. '/properties-list.component.html')
  // try to serve it from the local `src/` tree (useful in dev / non-bundled builds).
  server.get('/*.component.html', (req, res, next) => {
    const name = req.path.replace(/^\//, ''); // properties-list.component.html
    // search for the file under project src directory
    const projectRoot = resolve(serverDistFolder, '..', '..');
    const srcRoot = resolve(projectRoot, 'src');

    function findFileSync(dir: string, target: string): string | null {
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const e of entries) {
          const p = join(dir, e.name);
          if (e.isFile() && e.name === target) return p;
          if (e.isDirectory()) {
            const found = findFileSync(p, target);
            if (found) return found;
          }
        }
      } catch (e) {
        return null;
      }
      return null;
    }

    const found = findFileSync(srcRoot, name);
    if (found) {
      return res.sendFile(found);
    }
    return next();
  });

  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
