import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';

import { GetTokenDto } from './dto/get-token.dto';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get('init')
  initTokens() {
    return this.tokensService.initTokens();
  }

  @Get()
  getTokenInfo(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: GetTokenDto,
  ) {
    return this.tokensService.getTokenInfo(query);
  }
}
