import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MetadataModel, MetadataSchema } from './entities/metadata.entity';
import { TokenModel, TokenSchema } from './entities/token.entity';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TokenModel.name, schema: TokenSchema },
      { name: MetadataModel.name, schema: MetadataSchema },
    ]),
  ],
  controllers: [TokensController],
  providers: [TokensService],
})
export class TokensModule {}
