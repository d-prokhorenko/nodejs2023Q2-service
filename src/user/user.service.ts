import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataBase } from 'src/db/db';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly db: DataBase) {}

  public createUser({ login, password }: CreateUserDto): User {
    const user = new User({
      id: randomUUID(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    this.db.users.push(user);

    return user;
  }

  public getUsers(): User[] {
    return this.db.users;
  }

  public findOne(userId: string): User | null {
    const user = this.db.users.find(({ id }: User) => id === userId);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  public updateUser(
    userId: string,
    { oldPassword, newPassword }: UpdateUserDto,
  ): User {
    const user = this.db.users.find(({ id }: User) => id === userId);

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password === oldPassword) {
      user.password = newPassword;
      user.version += 1;
      user.updatedAt = Date.now();

      return user;
    }

    throw new ForbiddenException();
  }

  public deleteUser(userId: string): void {
    const userIndex = this.db.users.findIndex(({ id }: User) => id === userId);

    if (userIndex === -1) {
      throw new NotFoundException();
    }

    this.db.users.splice(userIndex, 1);
  }
}
