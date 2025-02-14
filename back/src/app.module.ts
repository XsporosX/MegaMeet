import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbConfig } from './config/data-source';
import { AuthModule } from './module/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

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

    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '10h' },
      secret: process.env.JWT_SECRET,
    }),

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
