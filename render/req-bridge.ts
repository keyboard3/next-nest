import * as http from "http";
const mockRequest = {
  headers: {
    'x-forwarded-for': '127.0.0.1',
    host: '127.0.0.1',
    hostname: '127.0.0.1',
    'Content-Type': '',
    'Content-Length': 0
  },
  method: 'GET',
  url: '/',
  socket: {
    remoteAddress: '127.0.0.1',
    remotePort: 3000
  }
};
function mockHttp(req: Object = {}) {
  const request = { ...JSON.parse(JSON.stringify(mockRequest)), ...req };
  const response = new http.ServerResponse(request);
  return {
    request,
    response
  };
}
function mockContext(req?: {}) {
  const { request, response } = mockHttp(req);
  return { req: request, res: response }
}
export async function getApi(url: string, query?: any) {
  const appServer: any = (global as any).nestApp;
  const mockCtx = mockContext({
    url: `/api/${url}`,
    path: `/api/${url}`,
    method: 'GET',
  });
  return new Promise((resolve, reject) => {
    const res: any = mockCtx.res;
    res.send = (body: any) => {
      if (typeof body == "string") {
        try {
          resolve(JSON.parse(body))
        } catch (error) {
          resolve(body);
        }
      } else
        resolve(body);
    }
    appServer.getHttpAdapter().getInstance()(mockCtx.req, mockCtx.res);
  });
}
