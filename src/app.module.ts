import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

import configuration, { EnvironmentVariables } from './config/app';
import { TokensModule } from './tokens/tokens.module';
import { Coigecko } from './tokens/providers/coigecko/coigecko';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [Coigecko],
  exports: [HttpModule, Coigecko],
})
export class GlobalModule {}

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => {
        return {
          uri: configService.get('mongodb').uri,
        };
      },
      inject: [ConfigService],
    }),
    TokensModule,
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService, Coigecko],
})
export class AppModule {}
