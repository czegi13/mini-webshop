import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Returns a welcome message
   * @returns Welcome message string
   */
  getHello(): string {
    return 'Hello World!';
  }
}
