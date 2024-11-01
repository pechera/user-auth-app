import { IsDefined, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SingUpDto {
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(256)
  readonly username: string;

  @IsDefined()
  @IsNotEmpty()
  @MaxLength(256)
  readonly fullName: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
