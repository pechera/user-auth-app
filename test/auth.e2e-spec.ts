import { HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { SingUpDto } from '../src/auth/dto/signup.dto';
import { SingInDto } from '../src/auth/dto/signin.dto';
import { TokenDto } from '../src/auth/dto/token.dto';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authServiceMock: Partial<AuthService>;

  beforeEach(async () => {
    authServiceMock = {
      signUp: jest.fn().mockResolvedValue({ id: 1, username: 'testuser' }),
      signIn: jest.fn().mockResolvedValue({ token: 'valid_token' }),
      getUserData: jest.fn().mockResolvedValue({ id: 1, username: 'testuser' })
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/signup (POST) - should register a new user', () => {
    const signUpDto: SingUpDto = { username: 'testuser', fullName: 'Test User', password: 'password123' };

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(signUpDto)
      .expect(HttpStatus.CREATED)
      .expect({ id: 1, username: 'testuser' });
  });

  it('/signin (POST) - should authenticate a user', () => {
    const signInDto: SingInDto = { username: 'testuser', password: 'password123' };

    return request(app.getHttpServer())
      .post('/auth/signin')
      .send(signInDto)
      .expect(HttpStatus.OK)
      .expect({ token: 'valid_token' });
  });

  it('/token (POST) - should get user data by jwt token', () => {
    const tokenDto: TokenDto = { token: 'valid_token' };

    return request(app.getHttpServer())
      .post('/auth/token')
      .send(tokenDto)
      .expect(HttpStatus.OK)
      .expect({ id: 1, username: 'testuser' });
  });
});
