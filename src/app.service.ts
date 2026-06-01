import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {

    return 'Kopi Backend Running ☕';
  }
}
