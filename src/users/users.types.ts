export interface IUser {
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

export interface IUserFilter {
  id?: number;
  name?: string;
  email?: string;
  role?:
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
