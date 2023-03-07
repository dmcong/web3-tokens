import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface IMetadata {
  priceUsd: number;
  decimals: number;
  image: string;
  homepage?: string;
}

export type MetadataDocument = MetadataModel & Document;

@Schema({ autoIndex: true, timestamps: true })
export class MetadataModel implements IMetadata {
  @Prop({ type: Number, required: true })
  priceUsd: number;

  @Prop({ type: Number, required: true })
  decimals: number;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true, index: true })
  address: string;

  @Prop({ type: String })
  homepage: string;
}

export const MetadataSchema = SchemaFactory.createForClass(MetadataModel);
