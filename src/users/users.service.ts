import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto, UserFilterDto } from './users.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Joao', email: 'joao@example.com', role: 'admin' },
    { id: 2, name: 'Maria', email: 'maria@example.com', role: 'regular' },
    { id: 3, name: 'Jose', email: 'jose@example.com', role: 'regular' },
    { id: 4, name: 'Ana', email: 'ana@example.com', role: 'regular' },
    { id: 5, name: 'Carlos', email: 'carlos@example.com', role: 'seller' },
    { id: 6, name: 'Mariana', email: 'mariana@example.com', role: 'regular' },
    { id: 7, name: 'Paulo', email: 'paulo@example.com', role: 'partner' },
    { id: 8, name: 'Julia', email: 'julia@example.com', role: 'regular' },
    { id: 9, name: 'Lucas', email: 'lucas@example.com', role: 'seller' },
  ];

  findAll(query: UserFilterDto) {
    const filteredUsers = this.users.filter((user) => {
      return Object.keys(query).every((key) => {
        if (query[key] !== undefined && query[key] !== null) {
          return user[key] === query[key];
        }
        return true;
      });
    });

    if (query.role && filteredUsers.length === 0) {
      throw new NotFoundException(`Users with role ${query.role} not found`);
    }

    if (query.name && filteredUsers.length === 0) {
      throw new NotFoundException(`Users with name ${query.name} not found`);
    }

    if (query.email && filteredUsers.length === 0) {
      throw new NotFoundException(`Users with email ${query.email} not found`);
    }

    return filteredUsers;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  create(user: UserDto) {
    const lastId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: lastId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UserFilterDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
