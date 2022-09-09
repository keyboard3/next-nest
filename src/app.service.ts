import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getUser(uid:string) {
    return { username: "张三" };
  }
}
