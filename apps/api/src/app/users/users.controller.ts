import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, ApiProduces, ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserRO } from './models/user.ro';
import { UserDTO } from './models/user.dto';
import { AuthGuard } from '../shared/auth.guard';
import { UserPostsRO } from './models/user-posts.ro';
import { ApiSwaggerOperation } from '../../decorators/api-swagger-operation.decorator';

@ApiUseTags('users')
@Controller()
export class UsersController {
  constructor(private userService: UsersService) { }
  @Get('users')
  @ApiSwaggerOperation()
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @ApiProduces('application/json')
  @ApiResponse({ status: 200, type: [UserPostsRO] })
  showAllUsers(@Query('page') page: number): Promise<UserPostsRO[]> {
    return this.userService.showAllUsers(page);
  }
  @Post('login')
  @ApiSwaggerOperation()
  @ApiResponse({ status: 201, type: UserRO })
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }
  @Post('register')
  @ApiSwaggerOperation()
  @ApiResponse({ status: 201, type: UserRO })
  register(@Body() data: UserDTO) {
    return this.userService.register(data)
  }
}
