import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { patterns } from 'src/shared/patterns';

export class CreateRequestDto {
  @IsString()
  @Matches(patterns.username, { message: 'Username is not in a valid format' })
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(4)
  discriminator: string;
}
