import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';
import { genSalt, hash, compare } from 'bcrypt';

// Mock bcrypt methods
jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
  compare: jest.fn()
}));

describe('BcryptService', () => {
  let service: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService]
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hash', () => {
    it('should hash data with salt', async () => {
      // Arrange
      const data = 'somePassword';
      const salt = 'testSalt';
      const hashedData = 'hashedPassword';

      (genSalt as jest.Mock).mockResolvedValue(salt);
      (hash as jest.Mock).mockResolvedValue(hashedData);

      // act
      const result = await service.hash(data);

      // assert
      expect(genSalt).toHaveBeenCalled();
      expect(hash).toHaveBeenCalledWith(data, salt);
      expect(result).toBe(hashedData);
    });
  });

  describe('compare', () => {
    it('should return true if data matches the encrypted value', async () => {
      // arrange
      const data = 'somePassword';
      const encrypted = 'encryptedPassword';
      (compare as jest.Mock).mockResolvedValue(true);

      // act
      const result = await service.compare(data, encrypted);

      // assert
      expect(compare).toHaveBeenCalledWith(data, encrypted);
      expect(result).toBe(true);
    });

    it('should return false if data does not match the encrypted value', async () => {
      // arrange
      const data = 'somePassword';
      const encrypted = 'encryptedPassword';
      (compare as jest.Mock).mockResolvedValue(false);

      // act
      const result = await service.compare(data, encrypted);

      // assert
      expect(compare).toHaveBeenCalledWith(data, encrypted);
      expect(result).toBe(false);
    });
  });
});
