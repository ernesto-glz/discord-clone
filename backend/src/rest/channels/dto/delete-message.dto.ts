import { IsString, Matches } from 'class-validator';
import { patterns } from 'src/shared/patterns';

export class DeleteMessageDto {
  @IsString()
  @Matches(patterns.snowflake)
  channelId: string;

  @IsString()
  @Matches(patterns.snowflake)
  messageId: string;
}
