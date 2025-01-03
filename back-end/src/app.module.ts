import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import { TrainersModule } from './trainers/trainers.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainerSessionModule } from './trainer-session/trainer-session.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SessionsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        url: configService.get('POSTGRES_URL'),
        synchronize: true,
        dropSchema: false,
      }),
      inject: [ConfigService],
    }),
    TrainersModule,
    TrainerSessionModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
