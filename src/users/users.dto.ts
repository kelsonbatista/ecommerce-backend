import { PartialType } from '@nestjs/mapped-types';

export class UserDto {
  id: number;
  name: string;
  email: string;
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
