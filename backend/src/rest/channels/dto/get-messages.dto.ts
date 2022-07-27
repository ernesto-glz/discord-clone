import { IsOptional, IsString, Matches } from 'class-validator';
import { patterns } from 'src/shared/patterns';

export class GetMessagesQueryDto {
  @IsOptional()
  back?: number;
}

export class GetMessagesParamDto {
  @IsString()
  @Matches(patterns.snowflake, { message: 'Invalid channel id' })
  channelId: string;
}
