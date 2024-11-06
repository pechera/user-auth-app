import { Module } from '@nestjs/common';

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
export class RedisModule {}
