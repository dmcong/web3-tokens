import { IsNotEmpty, IsString } from 'class-validator';
import { PLATFORMS } from '../providers/coigecko/enum';

export class GetTokenDto {
  @IsString()
  @IsNotEmpty()
  platform: PLATFORMS;

  @IsString()
  @IsNotEmpty()
  contract_address: string;
}
