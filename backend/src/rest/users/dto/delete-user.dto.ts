import { IsString, Matches } from 'class-validator';
import { patterns } from 'src/shared/patterns';

export class DeleteUserDto {
  @IsString()
  @Matches(patterns.password, { message: 'Password is not in a valid format' })
  password: string;
}
