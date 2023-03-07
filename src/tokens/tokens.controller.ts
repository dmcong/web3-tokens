import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';

import { GetTokenDto } from './dto/get-token.dto';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: GetTokenDto,
  ) {
    return this.tokensService.find(query);
  }
}
