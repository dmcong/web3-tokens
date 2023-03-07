import { IMetadata } from './metadata.entity';

export interface IToken {
  platforms: string;
  address: string;
  symbol: string;
  decimals: number;
  metadata: IMetadata;
}

export class Token {}
