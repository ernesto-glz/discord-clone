import { IsString, Matches } from 'class-validator';
import { patterns } from 'src/shared/patterns';

export class RegisterUserDto {
  @IsString()
  @Matches(patterns.username, { message: 'Username is not in a valid format' })
  username: string;

  @IsString()
  @Matches(patterns.email, { message: 'Not a well formed email address.' })
  email: string;

  @IsString()
  @Matches(patterns.password, { message: 'Password is not in a valid format' })
  password: string;
}
