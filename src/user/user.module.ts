import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataBase } from 'src/db/db';

@Module({
  controllers: [UserController],
  providers: [UserService, DataBase],
})
export class UserModule {}
