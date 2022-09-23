import * as http from 'http';

const mockRequest = {
  headers: {
    'x-forwarded-for': '127.0.0.1',
    host: '127.0.0.1',
    hostname: '127.0.0.1',
    'Content-Type': '',
    'Content-Length': 0,
  },
  method: 'GET',
  url: '/',
  socket: {
    remoteAddress: '127.0.0.1',
    remotePort: 3000,
  },
};
function mockHttp(req: any = {}) {
  const request = { ...JSON.parse(JSON.stringify(mockRequest)), ...req };
  const response = new http.ServerResponse(request);
  return {
    request,
    response,
  };
}
function mockContext(req?: any) {
  const { request, response } = mockHttp(req);
  return { req: request, res: response };
}
export async function getApi(handleRequest: (req, res) => void, url: string) {
  const urlObj = new URL(url);
  const mockCtx = mockContext({
    url: urlObj.pathname,
    path: urlObj.pathname,
    method: 'GET',
  });
  return new Promise((resolve, reject) => {
    const res: any = mockCtx.res;
    res.send = (body: any) => {
      if (typeof body == 'string') {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          resolve(body);
        }
      } else {
        resolve(body);
      }
    };
    handleRequest(mockCtx.req, mockCtx.res);
  });
}

import path from 'path';
module.paths.push(path.resolve(__dirname, '../../'));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestHandler = require('render');

export function rootMiddleware(req, res, next) {
  if (req.url?.startsWith('/api')) {
    console.log(`api ${req.url} access`);
    next();
  } else {
    console.log(`page ${req.url} access`);
    requestHandler(req, res);
  }
}
