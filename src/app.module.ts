import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TokensModule } from './tokens/tokens.module';
import { Coigecko } from './tokens/providers/coigecko/coigecko';

@Global()
@Module({
  imports: [HttpModule],
  providers: [Coigecko],
  exports: [HttpModule, Coigecko],
})
export class GlobalModule {}

@Module({
  imports: [TokensModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService, Coigecko],
})
export class AppModule {}
