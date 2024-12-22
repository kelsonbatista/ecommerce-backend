import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

// DTO = Data Transfer Objects
// DTOs are used to define the shape of data that is passed between different parts of the application

export class UserDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(
    [
      'admin',
      'manager',
      'moderator',
      'seller',
      'partner',
      'affiliate',
      'guest',
      'assistant',
      'support',
      'investor',
      'bot',
      'regular',
    ],
    {
      message: 'Invalid role',
    },
  )
  role:
    | 'admin'
    | 'manager'
    | 'moderator'
    | 'seller'
    | 'partner'
    | 'affiliate'
    | 'guest'
    | 'assistant'
    | 'support'
    | 'investor'
    | 'bot'
    | 'regular';
}

export class UserFilterDto extends PartialType(UserDto) {}
