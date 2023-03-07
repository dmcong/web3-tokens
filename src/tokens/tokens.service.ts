import { Coigecko } from './providers/coigecko/coigecko';
import { Injectable } from '@nestjs/common';
import { GetTokenDto } from './dto/get-token.dto';

@Injectable()
export class TokensService {
  constructor(private readonly coigecko: Coigecko) {}

  async initData() {
    const data = await this.coigecko.coinList({
      include_platform: true,
    });
  }

  async getTokenInfo() {
    const data = await this.coigecko.coinList({
      include_platform: true,
    });
  }

  async find(dto: GetTokenDto) {
    const data = await this.coigecko.contract({
      id: dto.platform,
      contract_address: dto.contract_address,
    });
    console.log('data', data);
    return `This action returns all tokens`;
  }
}
