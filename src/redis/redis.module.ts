import { Module, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { REDIS_CONNECTION_KEY } from '@common/constants/redis.constant';
import { RedisService } from './redis.service';

@Module({
  providers: [
    RedisService,
    {
      provide: REDIS_CONNECTION_KEY,
      inject: [RedisService],
      useFactory: async (redisService: RedisService) => {
        return redisService.getRedisClient();
      }
    }
  ],
  exports: [REDIS_CONNECTION_KEY, RedisService]
})
export class RedisModule implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onApplicationShutdown(signal?: string): Promise<void> {
    return new Promise<void>(async (resolve) => {
      const redis = this.moduleRef.get(REDIS_CONNECTION_KEY);
      redis.quit();
    });
  }
}
