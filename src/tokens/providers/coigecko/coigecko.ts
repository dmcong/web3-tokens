import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { API_ROUTES, PLATFORMS } from './enum';
import { CoinFullInfo, CoinListResponseItem } from './interface';

@Injectable()
export class Coigecko {
  private static readonly API_V3_URL = 'https://api.coingecko.com/api/v3';

  constructor(private readonly httpService: HttpService) {}

  private withPathParams(
    path: string,
    replacements: { [x: string]: string } = {},
  ) {
    let pathStr = path;
    Object.entries(replacements).forEach(([key, value]) => {
      pathStr = pathStr.replace(`{${key}}`, value as string);
    });
    return pathStr;
  }

  /**
   * Generic function to make request use in internal function
   * @param action
   * @param params
   * @returns
   */
  private async makeRequest<T>(
    action: API_ROUTES,
    params: { [key: string]: any } = {},
  ): Promise<T> {
    const url = Coigecko.API_V3_URL + this.withPathParams(action, params);
    return this.httpService.axiosRef.get<T>(url) as T;
  }

  /**
   * Get historical market data include price, market cap, and 24h volume (granularity auto) from a contract address
   * @see https://www.coingecko.com/api/documentations/v3#/contract/get_coins__id__contract__contract_address_
   * @returns current data for a coin
   * @param input.id Asset platform (only ethereum is supported at this moment)
   * @param input.contract_address Token’s contract address
   * @category Contract
   * @returns {CoinFullInfo}
   */
  public async contract(params: { id: PLATFORMS; contract_address: string }) {
    return this.makeRequest<CoinFullInfo>(API_ROUTES.CONTRACT, params);
  }

  /**
   * List all supported coins id, name and symbol (no pagination required)
   * Use this to obtain all the coins’ id in order to make API calls
   * @category Coin
   * @param input.include_platform flag to include platform contract addresses (eg. 0x… for Ethereum based tokens).
valid values: true, false
   * @returns {CoinListResponseItem[]}
   */
  public async coinList(params: { include_platform?: boolean }) {
    return this.makeRequest<CoinListResponseItem[]>(
      API_ROUTES.COIN_LIST,
      params,
    );
  }
}
