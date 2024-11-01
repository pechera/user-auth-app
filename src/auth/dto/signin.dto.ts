import { IsDefined, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SingInDto {
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(256)
  readonly username: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
