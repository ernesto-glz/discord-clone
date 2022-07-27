import { IsString, Matches } from 'class-validator';
import { patterns } from 'src/shared/patterns';

export class ChangePasswordDto {
  @IsString()
  @Matches(patterns.password, { message: 'Current password is not in a valid format' })
  currentPassword: string;

  @IsString()
  @Matches(patterns.password, { message: 'New password is not in a valid format' })
  newPassword: string;
}
