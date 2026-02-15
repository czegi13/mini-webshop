import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Root endpoint that returns a welcome message
   * @returns Welcome message string
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
