import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  redisClient: Redis;

  constructor(private readonly configService: ConfigService) {
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
}
