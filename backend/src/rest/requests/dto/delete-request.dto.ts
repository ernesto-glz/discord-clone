import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { patterns } from 'src/shared/patterns';

export class DeleteRequestDto {
  @IsNotEmpty()
  @IsString()
  @Matches(patterns.snowflake, { message: 'Invalid request id' })
  requestId: string;
}
