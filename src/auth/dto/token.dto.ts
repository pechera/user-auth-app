import { IsDefined, IsNotEmpty } from 'class-validator';

export class TokenDto {
  @IsDefined()
  @IsNotEmpty()
  readonly token: string;
}
