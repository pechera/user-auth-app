import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';

import { ConfigService } from '@nestjs/config';

import { Redis } from 'ioredis';

describe('RedisService', () => {
  let redisService: RedisService;
  let redisClient: Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisService, ConfigService]
    }).compile();

    redisService = module.get<RedisService>(RedisService);
    redisClient = redisService.getRedisClient();
  });

  it('should be defined', () => {
    expect(redisService).toBeDefined();
  });

  it('should return redis client', () => {
    expect(redisService.getRedisClient()).toBe(redisClient);
  });
});
