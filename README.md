# next-nest
同胞兄弟 [next-daruk](https://github.com/keyboard3/next-daruk) daruk 轻量级的 web 框架

同胞兄弟 [egg-midway-next](https://github.com/keyboard3/egg-midway-next) midway 拥有阿里强大的生态

[nest](https://docs.nestjs.cn/9/firststeps) 强大的 web 框架，生态完备。[Next.js](https://nextjs.org/docs)强大的 ssr 前端框架。强强联合

[nest](https://docs.nestjs.cn/9/firststeps) 的写法, 给个 controller 的例子
/src/app.controller.ts
```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('get_user')
  async getUser(@Query() uid: string) {
    return this.appService.getUser(uid);
  }
}
```

/pages/index.tsx
```typescript
export async function getServerSideProps(context: NextPageContext) {
  const user: any = await getApi('get_user?uid=111');
  return {
    props: { name: user.username }, // will be passed to the page component as props
  }
}
```
