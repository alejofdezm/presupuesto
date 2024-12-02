import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';

@ApiTags('users') 
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of all users', type: [User] })
  @Get("getall")
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Add a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created', type: User })
  @Post()
  async addUser(
    @Body('name') name: string,
    @Body('email') email: string,
  ): Promise<User> {
    return this.userService.addUser(name, email);
  }
}
