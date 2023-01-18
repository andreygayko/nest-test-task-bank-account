import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<PostgresConnectionOptions> => ({
  type: configService.get('POSTGRES_TYPE'),
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_ADMIN'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  synchronize: configService.get('POSTGRES_SYNCRONIZE'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  //dropSchema: true,
});
