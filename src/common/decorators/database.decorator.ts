import { Inject } from '@nestjs/common';
import { DATABASE_CONNECTION_KEY } from '@common/constants/database.constant';

export function InjectDatabase() {
  return Inject(DATABASE_CONNECTION_KEY);
}
