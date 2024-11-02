import { Injectable, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

import { Environment } from '@common/enums/environment.enum';

@Injectable()
export class RedisService {
  logger: Logger;
  redisClient: Redis;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger(RedisService.name);
    this.redisClient = new Redis(this.configService.get<string>('REDIS_URL'));
  }

  getRedisClient() {
    return this.redisClient;
  }

  async set(key: string, value: string | number): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async get(key: string): Promise<string> {
    return this.redisClient.get(key);
  }

  async onApplicationShutdown(signal: string) {
    return new Promise<void>(async (resolve) => {
      await this.redisClient.ping();
      await this.redisClient.quit();
      this.logger.log('Redis off');
      resolve();
    });
  }
}
