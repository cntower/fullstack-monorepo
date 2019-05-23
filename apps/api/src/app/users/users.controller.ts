import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@Controller()
export class UsersController {
  constructor(private userService: UsersService) { }
  @Get('users')
  @ApiResponse({status: 200, type: [UserEntity]})
  showAllUsers() {
    return this.userService.showAllUsers();
  }
  @Post('login')
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }
  @Post('register')
  register(@Body() data: UserDTO) {
    return this.userService.register(data)
  }
}
