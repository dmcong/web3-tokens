import { Model } from 'mongoose';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { GetTokenDto } from './dto/get-token.dto';
import { Coigecko } from './providers/coigecko/coigecko';
import { IToken, TokenDocument, TokenModel } from './entities/token.entity';
import { PLATFORMS } from './providers/coigecko/enum';
import { IMetadata } from './entities/metadata.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(TokenModel.name) private tokenModel: Model<TokenDocument>,
    private readonly coigecko: Coigecko,
  ) {}

  async initTokens() {
    const data = await this.coigecko.coinList({
      include_platform: true,
    });
    const mapTokens = new Map<string, IToken>();
    const duplicateTokens = [];

    for (const { id, name, platforms, symbol } of data) {
      for (const platform in platforms) {
        const address = platforms[platform];
        if (!address || !platform || !name || !symbol || !id) continue;

        const tokenKey = `${address}::${platform}`;
        const tokenData: IToken = { address, id, name, symbol, platform };

        if (mapTokens.has(tokenKey)) {
          duplicateTokens.push(mapTokens.get(tokenKey));
          duplicateTokens.push(tokenData);
          mapTokens.delete(tokenKey);
          continue;
        }
        mapTokens.set(tokenKey, tokenData);
      }
    }

    const tokens = Array.from(mapTokens.values());
    // TODO: session
    await this.tokenModel.deleteMany();
    await this.tokenModel.insertMany(tokens);
    return {
      total: tokens.length,
      duplicateTokens,
    };
  }

  async getTokenInfo(dto: GetTokenDto) {
    const tokens = await this.tokenModel.find({
      platform: dto.platform,
      address: dto.contract_address,
    });
    if (tokens.length !== 1) throw new ForbiddenException(tokens);

    const token = tokens[0];
    const { image, market_data, detail_platforms, links } =
      await this.coigecko.contract({
        id: token.platform as PLATFORMS,
        contract_address: token.address,
      });

    const homepage = links.homepage.find((e) => !!e);
    const metadata: IMetadata = {
      image: image.thumb,
      priceUsd: market_data.current_price['usd'],
      decimals: detail_platforms[token.platform].decimal_place,
      homepage,
    };
    return metadata;
  }
}
