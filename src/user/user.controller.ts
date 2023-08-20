import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ClassSerializerInterceptor,
  Header,
  UseInterceptors,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidateIdParam } from 'src/validators/uuid.validator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(): User[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', ValidateIdParam) id: string): User {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id', ValidateIdParam) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): User {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ValidateIdParam) id: string): void {
    return this.userService.deleteUser(id);
  }
}
