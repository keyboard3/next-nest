import { parse } from 'url';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const basePath = process.env.BASE_PATH || '';

const app = next({
  dev,
  hostname,
  port,
  dir: '../render',
  conf: { basePath, typescript: { ignoreBuildErrors: true } },
});
app.prepare();
const nextRequestHandler = app.getRequestHandler();

function exposeApiRouterMiddleware(req, res, next) {
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;
  if (pathname?.startsWith('/api')) {
    console.log(`api ${req.url} access`);
    next();
  } else {
    console.log(`page ${req.url} access`);
    nextRequestHandler(req, res, parsedUrl);
  }
}
export default exposeApiRouterMiddleware;
