import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PLATFORMS } from '../providers/coigecko/enum';

export class GetTokenDto {
  @IsString()
  @IsOptional()
  platform?: PLATFORMS;

  @IsString()
  @IsNotEmpty()
  contract_address: string;
}
