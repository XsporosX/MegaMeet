import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbConfig } from './config/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [dbConfig] }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbOptions = configService.get<TypeOrmModuleOptions>('database');
        if (!dbOptions) {
          throw new Error('Database configuration not found');
        }
        return dbOptions;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
