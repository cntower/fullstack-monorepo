import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, ApiProduces, ApiUseTags } from '@nestjs/swagger';
import { UserViewModel } from './models/user-view.model';
import { UserRegisterModel } from './models/user-register.model';

@ApiUseTags('users')
@Controller()
export class UsersController {
  constructor(private userService: UsersService) { }
  @Get('users')
  @ApiProduces('application/json')
  @ApiResponse({ status: 200, type: [UserViewModel] })
  showAllUsers(): Promise<UserViewModel[]> {
    return this.userService.showAllUsers();
  }
  @Post('login')
  @ApiResponse({ status: 201, type: UserViewModel })
  login(@Body() data: UserRegisterModel) {
    return this.userService.login(data);
  }
  @Post('register')
  @ApiResponse({ status: 201, type: UserViewModel })
  register(@Body() data: UserRegisterModel) {
    return this.userService.register(data)
  }
}
