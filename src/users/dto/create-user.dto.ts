import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  // @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  // @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  // @Matches(/\d/, { message: 'Password must contain at least one number' })
  // @Matches(/[@$!%*?&]/, { message: 'Password must contain at least one special character (@$!%*?&)' })
  password: string;

  @IsEnum(Role, {
    message: 'Invalid role',
  })
  role: Role;
}
