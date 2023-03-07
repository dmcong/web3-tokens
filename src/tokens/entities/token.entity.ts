import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface IToken {
  id: string;
  symbol: string;
  name: string;
  platform: string;
  address: string;
  // decimals: number;
  // metadata: IMetadata;
}

export type TokenDocument = TokenModel & Document;

@Schema({ autoIndex: true })
export class TokenModel implements IToken {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, required: true })
  symbol: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, index: true })
  platform: string;

  @Prop({ type: String, required: true, index: true })
  address: string;

  // @Prop({ type: Number })
  // decimals: number;

  // metadata: IMetadata;
}

export const TokenSchema = SchemaFactory.createForClass(TokenModel);
