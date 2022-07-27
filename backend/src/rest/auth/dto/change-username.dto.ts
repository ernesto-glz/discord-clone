import { IsString, Matches } from "class-validator";
import { patterns } from "src/shared/patterns";

export class ChangeUsernameDto {
  @IsString()
  @Matches(patterns.username, { message: 'Username is not in a valid format' })
  newUsername: string;

  @IsString()
  @Matches(patterns.password, { message: 'Password is not in a valid format' })
  password: string;
}