import { IsString, Matches } from 'class-validator';
import { patterns } from 'src/shared/patterns';

export class CreateChannelDto {
  @IsString()
  @Matches(patterns.snowflake, { message: 'Invalid user id' })
  userId: string;
}
