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
