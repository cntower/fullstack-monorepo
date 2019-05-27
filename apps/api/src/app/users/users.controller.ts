import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, ApiProduces, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserViewModel } from './models/user-view.model';
import { UserRegisterModel } from './models/user-register.model';
import { AuthGuard } from '../shared/auth.guard';

@ApiUseTags('users')
@Controller()
export class UsersController {
  constructor(private userService: UsersService) { }
  @Get('users')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
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
